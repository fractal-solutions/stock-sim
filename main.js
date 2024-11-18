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
    // Ensure positive price by using exponential of Box-Muller
    // This creates a log-normal distribution which keeps prices > 0
    const randomFactor = Math.exp(boxMullerTransform(0, volatility));
    return currentPrice * randomFactor;
}

// Add new event types and their impacts
const MARKET_EVENTS = {
    EARNINGS_BEAT: { impact: 0.15, duration: 120, message: "📈 Earnings Beat Expectations!" },
    EARNINGS_MISS: { impact: -0.12, duration: 120, message: "📉 Earnings Miss Expectations" },
    POSITIVE_NEWS: { impact: 0.05, duration: 60, message: "📰 Positive News Released" },
    NEGATIVE_NEWS: { impact: -0.04, duration: 60, message: "📰 Negative News Released" },
    ANALYST_UPGRADE: { impact: 0.08, duration: 90, message: "⭐ Analyst Upgrade" },
    ANALYST_DOWNGRADE: { impact: -0.07, duration: 90, message: "⬇️ Analyst Downgrade" },
};

// Add active events tracking for each stock
function createStockState(stock) {
    return {
        ...stock,
        activeEvents: [],
        eventHistory: [],
        lastEventTime: Date.now(),
        nextEventIn: 30000 + Math.random() * 60000
    };
}

function updateStockPrice(stockState, currentPrice, startTime, baseHype = 0.01) {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const hypeMultiplier = 1 + 0.5 * Math.sin(2 * Math.PI * elapsedSeconds / 60);
    
    let eventImpact = 0;
    const completedEvents = [];
    
    stockState.activeEvents = stockState.activeEvents.filter(event => {
        const eventElapsed = (Date.now() - event.startTime) / 1000;
        if (eventElapsed < event.duration) {
            const decayFactor = 1 - (eventElapsed / event.duration);
            eventImpact += MARKET_EVENTS[event.type].impact * decayFactor;
            return true;
        }
        completedEvents.push({
            type: event.type,
            startTime: new Date(event.startTime).toLocaleTimeString(),
            startPrice: event.startPrice,
            endPrice: currentPrice,
            impact: MARKET_EVENTS[event.type].impact
        });
        return false;
    });

    stockState.eventHistory = [...completedEvents, ...stockState.eventHistory].slice(0, 5);

    const currentHype = baseHype * hypeMultiplier * (1 + eventImpact);
    return generateStockPrice(currentPrice, currentHype);
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
        stockState.nextEventIn = 30000 + Math.random() * 60000;
        
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
    { name: 'BXMT', price: 0.5, hype: 0.5 }
]);


