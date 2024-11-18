import { MARKET_EVENTS } from './events.js';

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
    const MIN_PRICE = 0.005;  // Set minimum price threshold
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const hypeMultiplier = 1 + 0.1 * Math.sin(2 * Math.PI * elapsedSeconds / 60);
    
    let eventImpact = 0;
    const completedEvents = [];
    
    stockState.activeEvents = stockState.activeEvents.filter(event => {
        const eventElapsed = (Date.now() - event.startTime) / 1000;
        if (eventElapsed < MARKET_EVENTS[event.type].duration) {
            const decayFactor = 1 - (eventElapsed / MARKET_EVENTS[event.type].duration);
            const eventEffect = MARKET_EVENTS[event.type].impact * decayFactor;
            // Apply price floor when calculating new price
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

    const volatilityFactor = 0.006;
    // Apply price floor to final price calculation
    return Math.max(MIN_PRICE, generateStockPrice(currentPrice, volatilityFactor));
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


