export class Trader {
    constructor(initialBalance = 180) {
        this.balance = initialBalance;
        this.positions = new Map(); // Map<stockName, {shares: number, avgPrice: number}>
        this.transactions = [];
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Add icon based on type
        const icon = type === 'success' ? '✅' : 
                    type === 'error' ? '❌' : 
                    'ℹ️';
        
        toast.innerHTML = `${icon} <span style="flex: 1">${message}</span>`;
        toastContainer.appendChild(toast);

        // Force reflow to trigger animation
        toast.offsetHeight;
        toast.style.opacity = '1';

        // Remove toast after animation
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    canBuy(stockName, shares, currentPrice) {
        const totalCost = shares * currentPrice;
        return this.balance >= totalCost;
    }

    buy(stockName, shares, currentPrice) {
        const cost = shares * currentPrice;
        
        if (cost > this.balance) {
            this.showToast(`Insufficient funds to buy ${shares} shares of ${stockName}`, 'error');
            return false;
        }

        this.balance -= cost;
        
        const position = this.positions.get(stockName) || { shares: 0, avgPrice: 0 };
        const totalShares = position.shares + shares;
        const totalCost = (position.shares * position.avgPrice) + cost;
        position.shares = totalShares;
        position.avgPrice = totalCost / totalShares;
        
        this.positions.set(stockName, position);
        this.transactions.push({
            type: 'buy',
            stockName,
            shares,
            price: currentPrice,
            timestamp: Date.now()
        });

        this.showToast(`Bought ${shares} shares of ${stockName} at $${currentPrice.toFixed(2)}`, 'success');
        this.updateUI();
        return true;
    }

    sell(stockName, shares, currentPrice) {
        const position = this.positions.get(stockName);
        
        if (!position || position.shares < shares) {
            this.showToast(`Insufficient shares to sell ${shares} shares of ${stockName}`, 'error');
            return false;
        }

        const revenue = shares * currentPrice;
        this.balance += revenue;
        
        position.shares -= shares;
        if (position.shares === 0) {
            this.positions.delete(stockName);
        }
        
        this.transactions.push({
            type: 'sell',
            stockName,
            shares,
            price: currentPrice,
            timestamp: Date.now()
        });

        this.showToast(`Sold ${shares} shares of ${stockName} at $${currentPrice.toFixed(2)}`, 'success');
        this.updateUI();
        return true;
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