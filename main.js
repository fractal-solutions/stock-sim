import { MARKET_EVENTS, EVENT_CHAINS } from './events.js';

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
    const MIN_PRICE = 0.001;
    const change = 1 + (volatility * (Math.random() - 0.5));
    return Math.max(MIN_PRICE, currentPrice * change);
}

const STOCK_PERSONALITIES = {
    VOLATILE: { 
        eventFrequency: 1.5, 
        volatilityMod: 1.3, 
        message: "🎭 Drama Queen",
        shiftChance: 0.3,
        likelyShiftsTo: ['MEME', 'CURSED']
    },
    STABLE: { 
        eventFrequency: 0.7, 
        volatilityMod: 0.7, 
        message: "🧘 Zen Master",
        shiftChance: 0.1,
        likelyShiftsTo: ['LUCKY', 'VOLATILE']
    },
    LUCKY: { 
        eventFrequency: 1.2, 
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
        likelyShiftsTo: ['VOLATILE', 'MEME']
    },
    MEME: { 
        eventFrequency: 2.0, 
        volatilityMod: 2.0, 
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
    const MIN_PRICE = 0.005;  // Set minimum price threshold
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const hypeMultiplier = 1 + 0.1 * Math.sin(2 * Math.PI * elapsedSeconds / 60);
    
    // Apply personality modifiers
    const personality = STOCK_PERSONALITIES[stockState.personality];
    const volatilityMod = personality.volatilityMod || 1.0;
    
    let eventImpact = 0;
    const completedEvents = [];
    
    stockState.activeEvents = stockState.activeEvents.filter(event => {
        const eventElapsed = (Date.now() - event.startTime) / 1000;
        if (eventElapsed < MARKET_EVENTS[event.type].duration) {
            const decayFactor = 1 - (eventElapsed / MARKET_EVENTS[event.type].duration);
            // Apply personality modifier to event effects
            const eventEffect = MARKET_EVENTS[event.type].impact * decayFactor * volatilityMod;
            currentPrice = Math.max(MIN_PRICE, currentPrice * (1 + eventEffect));
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

    // Apply personality to base volatility
    const volatilityFactor = 0.006 * volatilityMod;
    return Math.max(MIN_PRICE, generateStockPrice(currentPrice, volatilityFactor));
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
    
    setInterval(() => {
        console.clear();
        stockStates.forEach((stockState, index) => {
            // Check for personality shifts
            const personalityShifted = checkPersonalityShift(stockState);
            if (personalityShifted) {
                console.log(`${stockState.name}: 🔄 ${stockState.eventHistory[0].message}`);
            }
            
            const newEvent = checkForNewEvent(stockState, prices[index]);
            if (newEvent) {
                console.log(`${stockState.name}: ${newEvent}`);
            }
            
            prices[index] = updateStockPrice(stockState, prices[index], startTime, stockState.hype);
            
            // Display stock name, price, personality, and shift availability
            const personality = STOCK_PERSONALITIES[stockState.personality];
            const timeInPersonality = ((Date.now() - (stockState.lastPersonalityCheck || Date.now())) / 1000).toFixed(0);
            
            // Calculate cooldown status
            const cooldownRemaining = stockState.lastPersonalityShift ? 
                Math.max(0, 120 - ((Date.now() - stockState.lastPersonalityShift) / 1000)) : 0;
            
            const cooldownStatus = cooldownRemaining > 0 ? 
                `(Shift in ${cooldownRemaining.toFixed(0)}s)` : 
                "(Shift Ready ✨)";
            
            console.log(`\n${stockState.name} - $${prices[index].toFixed(2)} ${personality.message} ${cooldownStatus}`);
            
            if (stockState.activeEvents.length > 0) {
                console.log('Active Events:');
                stockState.activeEvents.forEach(event => {
                    const elapsed = ((Date.now() - event.startTime) / 1000).toFixed(0);
                    console.log(`  • ${MARKET_EVENTS[event.type].message} (${elapsed}s elapsed)`);
                });
            } else {
                console.log('Active Events: None');
            }
            
            if (stockState.eventHistory.length > 0) {
                console.log('Recent Event History:');
                stockState.eventHistory.forEach(event => {
                    if (event.isPersonalityShift) {
                        console.log(`  • ${event.startTime} 🔄 ${event.message}`);
                    } else if (event.isChainEvent) {
                        const priceChange = ((event.endPrice - event.startPrice) / event.startPrice * 100).toFixed(2);
                        console.log(`  • ${event.startTime} ${event.message} (${priceChange}% 🔗)`);
                    } else {
                        const priceChange = ((event.endPrice - event.startPrice) / event.startPrice * 100).toFixed(2);
                        console.log(`  • ${event.startTime} ${MARKET_EVENTS[event.type].message} (${priceChange}%)`);
                    }
                });
            }
            console.log('----------------------------------------');
        });
    }, 1000);
}

// Start the simulation with initial stocks
startStockSimulation([
    { name: 'AAPL', price: 100, hype: 0.01 },
    { name: 'BXMT', price: 0.5, hype: 0.01 }
]);


