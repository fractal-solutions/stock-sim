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
    // Use a simpler random walk with controlled volatility
    const change = 1 + (volatility * (Math.random() - 0.5));
    return currentPrice * change;
}

// Modify event impacts and make them more consistent
const MARKET_EVENTS = {
    // Traditional Events
    EARNINGS_BEAT: { impact: 0.08, duration: 20, message: "📈 Earnings Beat Expectations!" },
    EARNINGS_MISS: { impact: -0.06, duration: 20, message: "📉 Earnings Miss Expectations" },
    POSITIVE_NEWS: { impact: 0.03, duration: 15, message: "📰 Positive News Released" },
    NEGATIVE_NEWS: { impact: -0.025, duration: 15, message: "📰 Negative News Released" },
    ANALYST_UPGRADE: { impact: 0.04, duration: 25, message: "⭐ Analyst Upgrade" },
    ANALYST_DOWNGRADE: { impact: -0.035, duration: 25, message: "⬇️ Analyst Downgrade" },
    
    // Major Market Events
    MARKET_CRASH: { impact: -0.65, duration: 30, message: "💥 Market Crash!" },
    BUYOUT_RUMOR: { impact: 0.52, duration: 30, message: "🤝 Buyout Rumors Circulating" },
    SEC_INVESTIGATION: { impact: -0.10, duration: 30, message: "🚨 SEC Investigation Announced" },
    PRODUCT_BREAKTHROUGH: { impact: 0.09, duration: 25, message: "🚀 Major Product Breakthrough" },
    
    // Social Media & Meme Events
    ELON_TWEET: { impact: 0.07, duration: 15, message: "🐦 Elon Musk Tweeted About Stock" },
    REDDIT_SURGE: { impact: 0.11, duration: 20, message: "🚀 Reddit WallStreetBets Surge" },
    VIRAL_TIKTOK: { impact: 0.05, duration: 15, message: "📱 Stock Trending on TikTok" },
    MEME_STATUS: { impact: 0.08, duration: 20, message: "🎭 Stock Achieves Meme Status" },
    
    // Tech & Innovation
    AI_BREAKTHROUGH: { impact: 0.13, duration: 25, message: "🤖 AI Technology Breakthrough" },
    METAVERSE_DEAL: { impact: 0.06, duration: 20, message: "🌐 Major Metaverse Partnership" },
    CRYPTO_ADOPTION: { impact: 0.07, duration: 20, message: "💎 Cryptocurrency Integration" },
    HACK_ATTACK: { impact: -0.08, duration: 25, message: "👾 Cybersecurity Breach" },
    
    // Corporate Drama
    CEO_SCANDAL: { impact: -0.09, duration: 25, message: "🎭 CEO Caught in Scandal" },
    INSIDER_TRADING: { impact: -0.07, duration: 20, message: "🕵️ Insider Trading Allegations" },
    WHISTLEBLOWER: { impact: -0.06, duration: 20, message: "🗣️ Whistleblower Comes Forward" },
    HOSTILE_TAKEOVER: { impact: 0.11, duration: 25, message: "⚔️ Hostile Takeover Attempt" },
    
    // Environmental & Social
    GREEN_INITIATIVE: { impact: 0.04, duration: 15, message: "🌱 New Sustainability Program" },
    ESG_RATING_UP: { impact: 0.03, duration: 15, message: "♻️ ESG Rating Upgraded" },
    ESG_RATING_DOWN: { impact: -0.03, duration: 15, message: "⚠️ ESG Rating Downgraded" },
    CLIMATE_IMPACT: { impact: -0.05, duration: 20, message: "🌡️ Climate Change Risk Identified" },
    
    // Partnerships & Deals
    APPLE_PARTNERSHIP: { impact: 0.09, duration: 25, message: "🍎 Apple Partnership Announced" },
    GOOGLE_DEAL: { impact: 0.08, duration: 25, message: "🔍 Google Deal Secured" },
    AMAZON_COLLAB: { impact: 0.08, duration: 25, message: "📦 Amazon Collaboration" },
    TESLA_AGREEMENT: { impact: 0.07, duration: 25, message: "⚡ Tesla Agreement Signed" },
    
    // Product & Service
    PRODUCT_RECALL: { impact: -0.07, duration: 20, message: "⚠️ Major Product Recall" },
    VIRAL_PRODUCT: { impact: 0.06, duration: 20, message: "🌟 Product Goes Viral" },
    SERVICE_OUTAGE: { impact: -0.04, duration: 15, message: "🔌 Service Outage Reported" },
    PATENT_WIN: { impact: 0.05, duration: 20, message: "📜 Major Patent Victory" },
    
    // International Events
    CHINA_APPROVAL: { impact: 0.07, duration: 20, message: "🇨🇳 China Market Access Granted" },
    EU_REGULATION: { impact: -0.05, duration: 20, message: "🇪🇺 EU Regulatory Challenge" },
    GLOBAL_EXPANSION: { impact: 0.06, duration: 20, message: "🌍 Major Global Expansion" },
    TRADE_WAR: { impact: -0.06, duration: 20, message: "🔄 Trade War Impact" },
    
    // Weird & Funny Events
    UFO_SIGHTING: { impact: 0.03, duration: 15, message: "👽 UFO Spotted Near HQ" },
    OFFICE_PARTY: { impact: 0.01, duration: 10, message: "🎉 Legendary Office Party" },
    CEO_TIKTOK: { impact: 0.02, duration: 15, message: "💃 CEO's TikTok Goes Viral" },
    MASCOT_INCIDENT: { impact: -0.01, duration: 10, message: "🎭 Company Mascot Mishap" },
    
    // Extreme Events
    ALIEN_TECH: { impact: 0.20, duration: 30, message: "🛸 Alien Technology Acquired" },
    TIME_MACHINE: { impact: 0.25, duration: 15, message: "⌛ Time Machine Patent Filed" },
    MULTIVERSE_BREACH: { impact: 0.15, duration: 25, message: "🌌 Multiverse Trading Started" },
    MATRIX_GLITCH: { impact: -0.12, duration: 25, message: "🥄 Matrix Glitch Detected" },
    
    // Cosmic & Supernatural Events
    THANOS_SNAP: { impact: -0.50, duration: 30, message: "💫 Thanos Snapped Half of Employees" },
    INFINITY_STONES: { impact: 0.65, duration: 30, message: "💎 Company Acquires Infinity Stones" },
    GHOST_CEO: { impact: 0.20, duration: 25, message: "👻 Dead Founder's Ghost Returns as CEO" },
    DIMENSION_PORTAL: { impact: 0.40, duration: 30, message: "🌀 Office Portal to Another Dimension" },
    CTHULHU_PARTNERSHIP: { impact: 0.45, duration: 30, message: "🐙 Elder God Partnership Signed" },
    
    // Time Travel Mishaps
    FUTURE_LEAK: { impact: 0.35, duration: 25, message: "🔮 Future Stock Prices Leaked" },
    PAST_PARADOX: { impact: -0.30, duration: 25, message: "⏰ Past Employee Kills Grandfather" },
    DINOSAUR_OFFICE: { impact: 0.25, duration: 20, message: "🦖 T-Rex Appointed to Board" },
    TIME_LOOP: { impact: -0.15, duration: 15, message: "🔄 Company Stuck in Time Loop" },
    
    // Meme Economy
    DOGECOIN_MERGER: { impact: 0.55, duration: 30, message: "🐕 Merging With Dogecoin" },
    HARAMBE_TRIBUTE: { impact: 0.25, duration: 20, message: "🦍 Harambe Hologram as Spokesperson" },
    STONKS_ASCENSION: { impact: 0.40, duration: 25, message: "📈 Achieved STONKS Enlightenment" },
    DIAMOND_HANDS: { impact: 0.30, duration: 20, message: "💎 🙌 Entire Board Gets Diamond Hands" },
    
    // Apocalyptic Events
    ZOMBIE_OUTBREAK: { impact: -0.45, duration: 30, message: "🧟 Zombie Outbreak in HQ" },
    SKYNET_AWAKENING: { impact: -0.60, duration: 30, message: "🤖 Company AI Becomes Skynet" },
    KAIJU_ATTACK: { impact: -0.55, duration: 30, message: "🦎 Godzilla Destroys Headquarters" },
    ALIEN_INVASION: { impact: -0.70, duration: 30, message: "👾 Hostile Alien Takeover Bid" },
    
    // Reality Bending
    SIMULATION_GLITCH: { impact: -0.35, duration: 25, message: "🎮 Matrix Code Leak Confirmed" },
    MEME_MAGIC: { impact: 0.45, duration: 25, message: "✨ Memes Become Reality" },
    REALITY_STONE: { impact: 0.80, duration: 30, message: "💫 Reality Successfully Altered" },
    METAVERSE_ESCAPE: { impact: 0.50, duration: 25, message: "🌐 NPCs Escape to Real World" },
    
    // Corporate Chaos
    PIZZA_CURRENCY: { impact: 0.15, duration: 20, message: "🍕 Pizza Becomes Company Currency" },
    SENTIENT_PRINTER: { impact: -0.20, duration: 20, message: "🖨️ Office Printer Gains Sentience" },
    COFFEE_SHORTAGE: { impact: -0.25, duration: 25, message: "☕ Catastrophic Coffee Shortage" },
    CASUAL_EVERYDAY: { impact: 0.10, duration: 15, message: "👔 Hawaiian Shirts Now Mandatory" },
    
    // Interdimensional Business
    GALACTIC_FEDERATION: { impact: 0.90, duration: 30, message: "🚀 Joining Galactic Federation" },
    MULTIVERSE_MONOPOLY: { impact: 0.85, duration: 30, message: "🌌 Monopoly Across Multiverse" },
    VOID_OUTSOURCING: { impact: 0.40, duration: 25, message: "🕳️ Outsourcing to The Void" },
    QUANTUM_PROFITS: { impact: 0.70, duration: 30, message: "⚛️ Quantum Superposition Profits" },
    
    // Peak Absurdity
    MUSK_MARS: { impact: 0.95, duration: 30, message: "🚀 Elon Moves Company to Mars" },
    DOGE_CEO: { impact: 0.75, duration: 30, message: "🐕 Actual Dog Becomes CEO" },
    BITCOIN_SENTIENCE: { impact: 0.65, duration: 30, message: "₿ Bitcoin Becomes Self-Aware" },
    CHAD_BOARD: { impact: 0.45, duration: 25, message: "💪 Board Replaced by Gigachads" },
    
    // Catastrophic Success
    MONEY_OVERFLOW: { impact: 1.50, duration: 30, message: "💰 Integer Overflow in Bank Account" },
    STONKS_SINGULARITY: { impact: 2.00, duration: 30, message: "📈 Achieved STONKS Singularity" },
    UNIVERSAL_BUYOUT: { impact: 5.00, duration: 30, message: "🌌 Company Buys Universe" },
    REALITY_IPO: { impact: 10.00, duration: 30, message: "✨ Reality Itself Goes Public" }
};

// Add active events tracking for each stock
function createStockState(stock) {
    return {
        ...stock,
        activeEvents: [],
        eventHistory: [],
        lastEventTime: Date.now(),
        nextEventIn: 12000 + Math.random() * 40000
    };
}

function updateStockPrice(stockState, currentPrice, startTime, baseHype = 0.01) {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const hypeMultiplier = 1 + 0.1 * Math.sin(2 * Math.PI * elapsedSeconds / 60); // Reduced base volatility
    
    let eventImpact = 0;
    const completedEvents = [];
    
    // Filter active events and move completed ones to history
    stockState.activeEvents = stockState.activeEvents.filter(event => {
        const eventElapsed = (Date.now() - event.startTime) / 1000;
        if (eventElapsed < MARKET_EVENTS[event.type].duration) {
            const decayFactor = 1 - (eventElapsed / MARKET_EVENTS[event.type].duration);
            // Direct price impact calculation
            const eventEffect = MARKET_EVENTS[event.type].impact * decayFactor;
            // Apply the effect directly to the price
            currentPrice = currentPrice * (1 + eventEffect);
            return true;
        }
        // Add completed event to history with actual impact
        completedEvents.push({
            type: event.type,
            startTime: new Date(event.startTime).toLocaleTimeString(),
            startPrice: event.startPrice,
            endPrice: currentPrice
        });
        return false;
    });

    // Update event history with completed events
    stockState.eventHistory = [...completedEvents, ...stockState.eventHistory].slice(0, 5);

    // Apply base market volatility
    const volatilityFactor = 0.005; // Very small base volatility
    return generateStockPrice(currentPrice, volatilityFactor);
}

function checkForNewEvent(stockState, currentPrice) {
    const now = Date.now();
    if (now - stockState.lastEventTime > stockState.nextEventIn) {
        const events = Object.keys(MARKET_EVENTS);
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        stockState.activeEvents.push({
            type: randomEvent,
            startTime: now,
            duration: MARKET_EVENTS[randomEvent].duration,
            startPrice: currentPrice
        });

        stockState.lastEventTime = now;
        stockState.nextEventIn = 12000 + Math.random() * 40000;
        
        return MARKET_EVENTS[randomEvent].message;
    }
    return null;
}

// Create a new function to manage all stock updates
function startStockSimulation(stocks) {
    const startTime = Date.now();
    let stockStates = stocks.map(createStockState);
    let prices = stocks.map(stock => stock.price);
    
    setInterval(() => {
        console.clear();
        stockStates.forEach((stockState, index) => {
            const newEvent = checkForNewEvent(stockState, prices[index]);
            if (newEvent) {
                console.log(`${stockState.name}: ${newEvent}`);
            }
            
            prices[index] = updateStockPrice(stockState, prices[index], startTime, stockState.hype);
            
            console.log(`\n${stockState.name} - $${prices[index].toFixed(2)}`);
            
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
                    const priceChange = ((event.endPrice - event.startPrice) / event.startPrice * 100).toFixed(2);
                    console.log(`  • ${event.startTime} ${MARKET_EVENTS[event.type].message} (${priceChange}%)`);
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


