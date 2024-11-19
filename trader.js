export class Trader {
    constructor(initialBalance = 180) {
        this.balance = initialBalance;
        this.positions = new Map(); // Map<stockName, {shares: number, avgPrice: number}>
        this.transactions = [];
    }

    canBuy(stockName, shares, currentPrice) {
        const totalCost = shares * currentPrice;
        return this.balance >= totalCost;
    }

    buy(stockName, shares, currentPrice) {
        const totalCost = shares * currentPrice;
        
        if (!this.canBuy(stockName, shares, currentPrice)) {
            throw new Error("Insufficient funds");
        }

        // Update balance
        this.balance -= totalCost;

        // Update position
        if (this.positions.has(stockName)) {
            const position = this.positions.get(stockName);
            const newTotalShares = position.shares + shares;
            const newTotalCost = (position.shares * position.avgPrice) + totalCost;
            position.shares = newTotalShares;
            position.avgPrice = newTotalCost / newTotalShares;
        } else {
            this.positions.set(stockName, {
                shares: shares,
                avgPrice: currentPrice
            });
        }

        // Record transaction
        this.transactions.push({
            type: 'BUY',
            stockName,
            shares,
            price: currentPrice,
            total: totalCost,
            timestamp: new Date()
        });

        this.updateUI();
    }

    sell(stockName, shares, currentPrice) {
        const position = this.positions.get(stockName);
        
        if (!position || position.shares < shares) {
            throw new Error("Insufficient shares");
        }

        const totalValue = shares * currentPrice;

        // Update balance
        this.balance += totalValue;

        // Update position
        position.shares -= shares;
        if (position.shares === 0) {
            this.positions.delete(stockName);
        }

        // Record transaction
        this.transactions.push({
            type: 'SELL',
            stockName,
            shares,
            price: currentPrice,
            total: totalValue,
            timestamp: new Date()
        });

        this.updateUI();
    }

    getPosition(stockName) {
        return this.positions.get(stockName);
    }

    calculatePnL(stockName, currentPrice) {
        const position = this.positions.get(stockName);
        if (!position) return 0;
        
        const costBasis = position.shares * position.avgPrice;
        const currentValue = position.shares * currentPrice;
        return currentValue - costBasis;
    }

    calculatePnLPercentage(stockName, currentPrice) {
        const position = this.positions.get(stockName);
        if (!position) return 0;
        
        const pnl = this.calculatePnL(stockName, currentPrice);
        const costBasis = position.shares * position.avgPrice;
        return costBasis > 0 ? (pnl / costBasis) * 100 : 0;
    }

    updateUI() {
        // Update account balance
        const balanceElement = document.querySelector('.balance');
        balanceElement.textContent = `$${this.balance.toFixed(2)}`;

        // Calculate total P/L
        let totalPnL = 0;
        let totalCostBasis = 0;

        // Update positions with P/L
        const positionsContainer = document.getElementById('positions');
        positionsContainer.innerHTML = Array.from(this.positions.entries())
            .map(([stockName, position]) => {
                // Get current price from the stock container
                const stockElement = document.querySelector(`[data-stock="${stockName}"]`);
                const currentPrice = stockElement ? 
                    parseFloat(stockElement.dataset.price) : 
                    position.avgPrice;

                const pnl = this.calculatePnL(stockName, currentPrice);
                const pnlPercentage = this.calculatePnLPercentage(stockName, currentPrice);
                
                // Add to totals
                totalPnL += pnl;
                totalCostBasis += position.shares * position.avgPrice;

                const isProfitable = pnl >= 0;

                return `
                    <div class="position">
                        <div class="position-header">
                            <span class="position-symbol">${stockName}</span>
                            <span class="position-shares">${position.shares} shares</span>
                        </div>
                        <div class="position-details">
                            <div class="position-avg-price">
                                Avg Price: $${position.avgPrice.toFixed(2)}
                            </div>
                            <div class="position-current">
                                Current: $${currentPrice.toFixed(2)}
                            </div>
                        </div>
                        <div class="position-pnl ${isProfitable ? 'profit' : 'loss'}">
                            ${isProfitable ? '▲' : '▼'} $${Math.abs(pnl).toFixed(2)} 
                            (${Math.abs(pnlPercentage).toFixed(2)}%)
                        </div>
                    </div>
                `;
            }).join('');

        // Update total P/L display
        const totalPnLElement = document.getElementById('total-pnl');
        if (totalPnLElement) {
            const totalPnLPercentage = totalCostBasis > 0 ? 
                (totalPnL / totalCostBasis) * 100 : 0;
            const isProfitable = totalPnL >= 0;
            
            totalPnLElement.className = isProfitable ? 'profit' : 'loss';
            totalPnLElement.textContent = `${isProfitable ? '▲' : '▼'} $${Math.abs(totalPnL).toFixed(2)} (${Math.abs(totalPnLPercentage).toFixed(2)}%)`;
        }
    }
}

// Create global trader instance
window.trader = new Trader(); 