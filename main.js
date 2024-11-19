import { MARKET_EVENTS, EVENT_CHAINS } from './events.js';

const MARKET_CONFIG = {
    globalVolatility: 0.05,  // 1.0 is baseline, 2.0 doubles volatility, 0.5 halves it
    minPrice: 0.001,
    baseEventFrequency: 8000,
    maxEventSpacing: 20000
};

let a = 10;
let b = 20;
let c = a + b;
console.log(c);

function boxMullerTransform(value, stddev = 0.5) {
    // Generate two independent random numbers between 0 and 1
    const u1 = Math.random();
    const u2 = Math.random();
    
    // Box-Muller transform formula
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    // Scale by standard deviation and add to input value
    return value + (z0 * stddev);
}
function generateStockPrice(currentPrice, volatility = 0.01) {
    const MIN_PRICE = MARKET_CONFIG.minPrice;
    // Apply global volatility to the change calculation
    const change = 1 + (volatility * MARKET_CONFIG.globalVolatility * (Math.random() - 0.5));
    
    if (change < 1) {
        const minChange = 0.05; 
        return Math.max(MIN_PRICE, currentPrice * Math.max(minChange, change));
    }
    
    return Math.max(MIN_PRICE, currentPrice * change);
}

const STOCK_PERSONALITIES = {
    VOLATILE: { 
        eventFrequency: 1, 
        volatilityMod: 1.2, 
        message: "🎭 Drama Queen",
        shiftChance: 0.3,
        likelyShiftsTo: ['MEME', 'CURSED']
    },
    STABLE: { 
        eventFrequency: 0.7, 
        volatilityMod: 0.4, 
        message: "🧘 Zen Master",
        shiftChance: 0.1,
        likelyShiftsTo: ['LUCKY', 'VOLATILE']
    },
    LUCKY: { 
        eventFrequency: 1.4, 
        positiveEventChance: 0.7, 
        message: "🍀 Fortune's Favorite",
        shiftChance: 0.2,
        likelyShiftsTo: ['STABLE', 'MEME']
    },
    CURSED: { 
        eventFrequency: 1.2, 
        negativeEventChance: 0.7, 
        message: "🎃 Murphy's Law",
        shiftChance: 0.4,
        likelyShiftsTo: ['VOLATILE', 'MEME', 'LUCKY']
    },
    MEME: { 
        eventFrequency: 1.1, 
        volatilityMod: 0.850, 
        message: "🦍 Diamond Hands",
        shiftChance: 0.5,
        likelyShiftsTo: ['VOLATILE', 'CURSED', 'LUCKY']
    }
};


// Add active events tracking for each stock
function createStockState(stock) {
    const personalities = Object.keys(STOCK_PERSONALITIES);
    const randomPersonality = personalities[Math.floor(Math.random() * personalities.length)];
    
    return {
        ...stock,
        personality: randomPersonality,
        activeEvents: [],
        eventHistory: [],
        lastEventTime: Date.now(),
        nextEventIn: 8000 + Math.random() * 20000
    };
}

function updateStockPrice(stockState, currentPrice, startTime, baseHype = 0.01) {
    const MIN_PRICE = MARKET_CONFIG.minPrice;
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const hypeMultiplier = 1 + 0.1 * Math.sin(2 * Math.PI * elapsedSeconds / 60);
    
    const personality = STOCK_PERSONALITIES[stockState.personality];
    // Apply global volatility to personality modifier
    const volatilityMod = (personality.volatilityMod || 1.0) * MARKET_CONFIG.globalVolatility;
    
    let eventImpact = 0;
    const completedEvents = [];
    
    stockState.activeEvents = stockState.activeEvents.filter(event => {
        const eventElapsed = (Date.now() - event.startTime) / 1000;
        if (eventElapsed < MARKET_EVENTS[event.type].duration) {
            const decayFactor = 1 - (eventElapsed / MARKET_EVENTS[event.type].duration);
            // Apply global volatility to event effects
            const eventEffect = MARKET_EVENTS[event.type].impact * decayFactor * volatilityMod;
            
            if (eventEffect < 0) {
                const maxNegativeImpact = -0.85 * MARKET_CONFIG.globalVolatility;
                const cappedEffect = Math.max(eventEffect, maxNegativeImpact);
                currentPrice = Math.max(MIN_PRICE, currentPrice * (1 + cappedEffect));
            } else {
                currentPrice = Math.max(MIN_PRICE, currentPrice * (1 + eventEffect));
            }
            return true;
        }
        completedEvents.push({
            type: event.type,
            startTime: new Date(event.startTime).toLocaleTimeString(),
            startPrice: event.startPrice,
            endPrice: currentPrice
        });
        return false;
    });

    stockState.eventHistory = [...completedEvents, ...stockState.eventHistory].slice(0, 5);

    // Apply global volatility to base volatility
    const volatilityFactor = 0.006 * volatilityMod;
    const baseChange = generateStockPrice(currentPrice, volatilityFactor);
    
    if (baseChange < currentPrice) {
        const maxDrop = currentPrice * (1 - (0.15 * MARKET_CONFIG.globalVolatility));
        return Math.max(MIN_PRICE, Math.max(maxDrop, baseChange));
    }
    
    return Math.max(MIN_PRICE, baseChange);
}

function checkForNewEvent(stockState, currentPrice) {
    const now = Date.now();
    if (now - stockState.lastEventTime > stockState.nextEventIn) {
        const events = Object.keys(MARKET_EVENTS);
        let randomEvent = events[Math.floor(Math.random() * events.length)];
        
        // Apply personality event chance modifiers
        const personality = STOCK_PERSONALITIES[stockState.personality];
        if (personality.positiveEventChance && Math.random() < personality.positiveEventChance) {
            // Filter for positive events
            randomEvent = events.find(event => MARKET_EVENTS[event].impact > 0);
        } else if (personality.negativeEventChance && Math.random() < personality.negativeEventChance) {
            // Filter for negative events
            randomEvent = events.find(event => MARKET_EVENTS[event].impact < 0);
        }
        
        // Adjust event frequency based on personality
        stockState.nextEventIn = (8000 + Math.random() * 20000) / (personality.eventFrequency || 1);
        
        stockState.activeEvents.push({
            type: randomEvent,
            startTime: now,
            duration: MARKET_EVENTS[randomEvent].duration,
            startPrice: currentPrice
        });

        stockState.lastEventTime = now;
        
        // Check for completed event chains
        Object.entries(EVENT_CHAINS).forEach(([chainName, chain]) => {
            const activeEventTypes = stockState.activeEvents.map(event => event.type);
            if (chain.sequence.every(type => activeEventTypes.includes(type))) {
                // Add chain completion to event history
                stockState.eventHistory.unshift({
                    type: chainName,
                    startTime: new Date(now).toLocaleTimeString(),
                    startPrice: currentPrice,
                    endPrice: currentPrice * (1 + chain.bonus),
                    isChainEvent: true,
                    chainBonus: chain.bonus,
                    message: chain.message
                });
                
                // Apply chain bonus
                currentPrice *= (1 + chain.bonus);
            }
        });
        
        return MARKET_EVENTS[randomEvent].message;
    }
    return null;
}

// Add personality shift function with cooldown
function checkPersonalityShift(stockState) {
    const now = Date.now();
    const SHIFT_COOLDOWN = 120000; // 2 minutes in milliseconds
    
    // Check for personality shift every 30 seconds AND ensure cooldown has passed
    if ((!stockState.lastPersonalityCheck || (now - stockState.lastPersonalityCheck) > 30000) && 
        (!stockState.lastPersonalityShift || (now - stockState.lastPersonalityShift) > SHIFT_COOLDOWN)) {
        
        const currentPersonality = STOCK_PERSONALITIES[stockState.personality];
        
        // Roll for personality shift
        if (Math.random() < currentPersonality.shiftChance) {
            const oldPersonality = stockState.personality;
            
            // 70% chance to shift to a likely personality, 30% chance for completely random
            if (Math.random() < 0.7 && currentPersonality.likelyShiftsTo.length > 0) {
                stockState.personality = currentPersonality.likelyShiftsTo[
                    Math.floor(Math.random() * currentPersonality.likelyShiftsTo.length)
                ];
            } else {
                const personalities = Object.keys(STOCK_PERSONALITIES).filter(p => p !== stockState.personality);
                stockState.personality = personalities[Math.floor(Math.random() * personalities.length)];
            }
            
            // Update shift timestamp
            stockState.lastPersonalityShift = now;
            
            // Add personality shift to event history
            stockState.eventHistory.unshift({
                type: 'PERSONALITY_SHIFT',
                startTime: new Date(now).toLocaleTimeString(),
                message: `Personality shifted from ${oldPersonality} to ${stockState.personality}`,
                isPersonalityShift: true,
                nextShiftAvailable: new Date(now + SHIFT_COOLDOWN).toLocaleTimeString()
            });
            
            return true;
        }
        
        stockState.lastPersonalityCheck = now;
    }
    return false;
}

// Update the display in startStockSimulation to show cooldown timer
function startStockSimulation(stocks) {
    const startTime = Date.now();
    let stockStates = stocks.map(createStockState);
    let prices = stocks.map(stock => stock.price);
    
    // Keep track of which histories are expanded
    const expandedHistories = new Set();
    
    // Make toggleHistory available globally with proper binding
    window.toggleHistory = function(stockName) {
        if (expandedHistories.has(stockName)) {
            expandedHistories.delete(stockName);
        } else {
            expandedHistories.add(stockName);
        }
        
        // Force immediate update
        const historyDiv = document.querySelector(`[data-stock="${stockName}"] .event-history`);
        const arrow = document.querySelector(`[data-stock="${stockName}"] .arrow`);
        
        if (historyDiv && arrow) {
            if (expandedHistories.has(stockName)) {
                historyDiv.classList.add('expanded');
                arrow.classList.add('expanded');
            } else {
                historyDiv.classList.remove('expanded');
                arrow.classList.remove('expanded');
            }
        }
    };
    
    function updateDisplay() {
        const stocksContainer = document.getElementById('stocks');
        stocksContainer.innerHTML = stockStates.map((stockState, index) => {
            const personality = STOCK_PERSONALITIES[stockState.personality];
            const cooldownRemaining = stockState.lastPersonalityShift ? 
                Math.max(0, 120 - ((Date.now() - stockState.lastPersonalityShift) / 1000)) : 0;
            
            const cooldownStatus = cooldownRemaining > 0 ? 
                `(Shift in ${cooldownRemaining.toFixed(0)}s)` : 
                "(Shift Ready ✨)";
            
            const isExpanded = expandedHistories.has(stockState.name);
            
            return `
                <div class="stock-container" data-stock="${stockState.name}" data-price="${prices[index]}">
                    <div class="stock-header">
                        <div class="stock-info">
                            <span class="ticker">${stockState.name}</span>
                            <span class="price">$${prices[index].toFixed(2)}</span>
                            <span class="personality">${personality.message}</span>
                            <span class="cooldown">${cooldownStatus}</span>
                        </div>
                        <div class="trade-buttons">
                            <button class="btn btn-buy" onclick="window.trader.buy('${stockState.name}', 1, ${prices[index]})">Buy</button>
                            <button class="btn btn-sell" onclick="window.trader.sell('${stockState.name}', 1, ${prices[index]})">Sell</button>
                        </div>
                    </div>
                    
                    <div class="events-container">
                        <strong>Active Events:</strong>
                        <div class="active-events">
                            ${stockState.activeEvents.length > 0 ? 
                                stockState.activeEvents.map(event => {
                                    const elapsed = ((Date.now() - event.startTime) / 1000).toFixed(0);
                                    return `<div class="event">
                                        • ${MARKET_EVENTS[event.type].message} (${elapsed}s elapsed)
                                    </div>`;
                                }).join('')
                                : 
                                `<div class="event empty-event">• No active events</div>`
                            }
                        </div>
                    </div>
                    
                    ${stockState.eventHistory.length > 0 ? `
                        <button class="history-toggle" onclick="toggleHistory('${stockState.name}')">
                            <span>Event History (${stockState.eventHistory.length})</span>
                            <span class="arrow ${isExpanded ? 'expanded' : ''}"></span>
                        </button>
                        <div class="event-history ${isExpanded ? 'expanded' : ''}">
                            ${stockState.eventHistory.map(event => {
                                if (event.isPersonalityShift) {
                                    return `<div class="event personality-shift">
                                        • ${event.startTime} 🔄 ${event.message}
                                    </div>`;
                                } else if (event.isChainEvent) {
                                    const priceChange = ((event.endPrice - event.startPrice) / event.startPrice * 100).toFixed(2);
                                    return `<div class="event chain-event">
                                        • ${event.startTime} ${event.message} (${priceChange}% 🔗)
                                    </div>`;
                                } else {
                                    const priceChange = ((event.endPrice - event.startPrice) / event.startPrice * 100).toFixed(2);
                                    return `<div class="event">
                                        • ${event.startTime} ${MARKET_EVENTS[event.type].message} (${priceChange}%)
                                    </div>`;
                                }
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        // Update P/L after updating stock displays
        if (window.trader) {
            window.trader.updateUI(prices);
        }
    }

    setInterval(() => {
        stockStates.forEach((stockState, index) => {
            const personalityShifted = checkPersonalityShift(stockState);
            const newEvent = checkForNewEvent(stockState, prices[index]);
            prices[index] = updateStockPrice(stockState, prices[index], startTime, stockState.hype);
        });
        updateDisplay();
    }, 1000);
}

// Start the simulation with initial stocks
startStockSimulation([
    { name: 'RUG', price: 100, hype: 0.01 },
    { name: 'PULL', price: 0.5, hype: 0.01 },
    { name: 'DICE', price: 14, hype: 0.01 },
    { name: 'HTTP', price: 35, hype: 0.01 },
    { name: 'MEME', price: 420.69, hype: 0.01 },
    { name: 'YOLO', price: 69.42, hype: 0.01 },
    { name: 'MOON', price: 1337, hype: 0.01 },
    { name: 'STONK', price: 42.0, hype: 0.01 },
    { name: 'HODL', price: 8008.5, hype: 0.01 },
    { name: 'FOMO', price: 999.99, hype: 0.01 }
]);

const THEMES = {
    'default': {
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        cardBg: '#1a1b1e',
        cardSecondary: '#2c2e33',
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa',
        accent: '#8b5cf6'
    },
    'cyberpunk': {
        gradient: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
        cardBg: '#001e3c',
        cardSecondary: '#0a2744',
        textPrimary: '#00ffff',
        textSecondary: '#80ffff',
        accent: '#ff00ff'
    },
    'dark-modern': {
        gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        cardBg: '#1f2937',
        cardSecondary: '#374151',
        textPrimary: '#f3f4f6',
        textSecondary: '#9ca3af',
        accent: '#3b82f6'
    },
    'deep-space': {
        gradient: 'linear-gradient(135deg, #090909 0%, #16222a 50%, #1a1a1a 100%)',
        cardBg: '#0f1318',
        cardSecondary: '#1a1f25',
        textPrimary: '#e2e8f0',
        textSecondary: '#94a3b8',
        accent: '#4f46e5'
    },
    'neon-night': {
        gradient: 'linear-gradient(135deg, #0a192f 0%, #20232a 50%, #161b22 100%)',
        cardBg: '#0d1117',
        cardSecondary: '#21262d',
        textPrimary: '#00ff00',
        textSecondary: '#80ff80',
        accent: '#ff00ff'
    },
    'matrix': {
        gradient: 'linear-gradient(135deg, #000000 0%, #0a2f1a 50%, #000000 100%)',
        cardBg: '#0a1f0a',
        cardSecondary: '#143114',
        textPrimary: '#00ff00',
        textSecondary: '#00cc00',
        accent: '#00ff00'
    }
};

function applyTheme(themeName) {
    const theme = THEMES[themeName];
    document.documentElement.style.setProperty('--bg-secondary', theme.cardBg);
    document.documentElement.style.setProperty('--bg-tertiary', theme.cardSecondary);
    document.documentElement.style.setProperty('--text-primary', theme.textPrimary);
    document.documentElement.style.setProperty('--text-secondary', theme.textSecondary);
    document.documentElement.style.setProperty('--accent-purple', theme.accent);
    document.body.style.backgroundImage = theme.gradient;
}

function initializeThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('preferred-theme', theme);
        });
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && THEMES[savedTheme]) {
        applyTheme(savedTheme);
    }
}
initializeThemeSelector();

function initializeMobileAccountPanel() {
    const accountPanel = document.getElementById('account-panel');
    let startY = 0;
    let isDragging = false;

    function handleTouchStart(e) {
        if (!e.target.closest('h3')) return; // Only allow dragging from the header
        isDragging = true;
        startY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        // Invert the direction: negative deltaY moves panel up, positive moves it down
        if (accountPanel.classList.contains('collapsed')) {
            // If collapsed, only allow upward movement (negative deltaY)
            if (deltaY < 0) {
                accountPanel.style.transform = `translateY(calc(100% - 50px + ${deltaY}px))`;
            }
        } else {
            // If expanded, only allow downward movement (positive deltaY)
            if (deltaY > 0) {
                accountPanel.style.transform = `translateY(${deltaY}px)`;
            }
        }
        
        e.preventDefault();
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const currentTransform = new WebKitCSSMatrix(
            window.getComputedStyle(accountPanel).transform
        ).m42;
        
        const threshold = 50; // pixels to determine expand/collapse
        
        if (accountPanel.classList.contains('collapsed')) {
            // If moving up from collapsed state
            if (currentTransform < -threshold) {
                accountPanel.classList.remove('collapsed');
            }
        } else {
            // If moving down from expanded state
            if (currentTransform > threshold) {
                accountPanel.classList.add('collapsed');
            }
        }
        
        accountPanel.style.transform = '';
    }

    function togglePanel() {
        accountPanel.classList.toggle('collapsed');
    }

    if (window.innerWidth <= 768) {
        // Add touch event listeners
        accountPanel.addEventListener('touchstart', handleTouchStart, { passive: false });
        accountPanel.addEventListener('touchmove', handleTouchMove, { passive: false });
        accountPanel.addEventListener('touchend', handleTouchEnd);

        // Add click handler for the drag handle
        const dragHandle = accountPanel.querySelector('h3');
        if (dragHandle) {
            dragHandle.addEventListener('click', togglePanel);
        }

        // Initialize in expanded state
        accountPanel.classList.remove('collapsed');
    } else {
        // Remove mobile-specific classes and listeners for desktop
        accountPanel.classList.remove('collapsed');
        accountPanel.style.transform = '';
        accountPanel.removeEventListener('touchstart', handleTouchStart);
        accountPanel.removeEventListener('touchmove', handleTouchMove);
        accountPanel.removeEventListener('touchend', handleTouchEnd);
    }
}

// Initialize on load and resize
window.addEventListener('DOMContentLoaded', initializeMobileAccountPanel);
window.addEventListener('resize', initializeMobileAccountPanel);

// Add viewport meta tag if not already present
if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(meta);
}
