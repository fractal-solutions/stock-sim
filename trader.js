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

    updateUI() {
        // Update account balance
        const balanceElement = document.querySelector('.balance');
        balanceElement.textContent = `$${this.balance.toFixed(2)}`;

        // Update positions
        const positionsContainer = document.getElementById('positions');
        positionsContainer.innerHTML = Array.from(this.positions.entries())
            .map(([stockName, position]) => `
                <div class="position">
                    <div>${stockName}</div>
                    <div>${position.shares} shares @ $${position.avgPrice.toFixed(2)}</div>
                </div>
            `).join('');
    }
}

// Create global trader instance
window.trader = new Trader(); 