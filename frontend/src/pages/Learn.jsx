import { useState } from 'react';
import { BookOpen, ChevronRight, TrendingUp, Shield, BarChart3, DollarSign } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Trading Basics: Getting Started',
    category: 'Beginner',
    icon: BookOpen,
    content: `
# Trading Basics: Getting Started with Cryptocurrency Trading

## What is Cryptocurrency Trading?

Cryptocurrency trading involves buying and selling digital assets like Bitcoin, Ethereum, and other cryptocurrencies with the aim of making a profit. Unlike traditional stock markets, crypto markets operate 24/7, providing constant trading opportunities.

## Key Concepts

### 1. Market Orders vs Limit Orders
- **Market Order**: Executes immediately at the current market price
- **Limit Order**: Executes only when the price reaches your specified level

### 2. Buy Low, Sell High
The fundamental principle of trading is to purchase assets at a lower price and sell them at a higher price, capitalizing on price movements.

### 3. Volatility
Cryptocurrency markets are highly volatile, meaning prices can change rapidly. This presents both opportunities and risks.

## Getting Started

1. **Start Small**: Begin with amounts you can afford to lose
2. **Learn Continuously**: Stay updated with market news and trends
3. **Practice**: Use demo accounts to practice without risk
4. **Develop a Strategy**: Don't trade on emotions

## Risk Management

Never invest more than you can afford to lose. The crypto market is unpredictable, and proper risk management is essential for long-term success.
    `
  },
  {
    id: 2,
    title: 'Understanding Market Analysis',
    category: 'Intermediate',
    icon: BarChart3,
    content: `
# Understanding Market Analysis

## Two Main Types of Analysis

### Technical Analysis
Technical analysis involves studying price charts and patterns to predict future price movements. Key tools include:

- **Candlestick Patterns**: Visual representations of price movements
- **Support and Resistance Levels**: Price levels where assets tend to bounce
- **Indicators**: RSI, MACD, Moving Averages help identify trends
- **Volume Analysis**: Trading volume confirms price movements

### Fundamental Analysis
Fundamental analysis examines the underlying value of a cryptocurrency:

- **Technology**: Blockchain capabilities and innovation
- **Team**: Developer expertise and track record
- **Use Case**: Real-world application and adoption
- **Market Cap**: Total value of all coins in circulation
- **Competition**: How it compares to similar projects

## Reading Charts

Understanding candlestick charts is crucial:
- **Green/White Candles**: Price increased during the period
- **Red/Black Candles**: Price decreased during the period
- **Wicks**: Show the highest and lowest prices reached

## Common Patterns

- **Head and Shoulders**: Indicates potential trend reversal
- **Double Top/Bottom**: Signals price resistance or support
- **Triangles**: Suggest continuation or reversal depending on type

## Timeframes

Different traders use different timeframes:
- **Day Trading**: Minutes to hours
- **Swing Trading**: Days to weeks
- **Long-term Investing**: Months to years

Choose a timeframe that matches your strategy and lifestyle.
    `
  },
  {
    id: 3,
    title: 'Risk Management Strategies',
    category: 'Intermediate',
    icon: Shield,
    content: `
# Risk Management Strategies

## Why Risk Management Matters

Proper risk management is the difference between successful traders and those who lose everything. Even the best trading strategy will fail without good risk management.

## The 1% Rule

Never risk more than 1-2% of your total capital on a single trade. This ensures that even a series of losses won't wipe out your account.

### Example:
- Account Balance: $10,000
- Maximum Risk per Trade: $100-200 (1-2%)
- This allows you to withstand 50-100 losing trades before going broke

## Stop-Loss Orders

A stop-loss automatically closes your position if the price moves against you by a specified amount.

**Benefits:**
- Limits potential losses
- Removes emotional decision-making
- Allows you to walk away from your computer

## Position Sizing

Determine how much to invest in each trade based on:
1. Your risk tolerance
2. The stop-loss distance
3. Your account size

## Diversification

Don't put all your eggs in one basket:
- Spread investments across multiple cryptocurrencies
- Consider different market cap sizes (large, mid, small cap)
- Balance between stable and volatile assets

## Risk-to-Reward Ratio

Always aim for trades where potential reward exceeds potential risk:
- Minimum ratio: 1:2 (risk $1 to make $2)
- Professional traders often seek 1:3 or higher

## Emotional Control

The biggest risk is often yourself:
- Don't trade on emotions (fear, greed, FOMO)
- Stick to your plan
- Accept that losses are part of trading
- Take breaks after significant wins or losses

## Portfolio Allocation

Suggested allocation for beginners:
- 50-60%: Major cryptocurrencies (BTC, ETH)
- 30-40%: Mid-cap established projects
- 10%: High-risk, high-reward opportunities

Remember: Only invest what you can afford to lose entirely.
    `
  },
  {
    id: 4,
    title: 'Trading Psychology',
    category: 'Advanced',
    icon: TrendingUp,
    content: `
# Trading Psychology: Mastering Your Mind

## The Mental Game

Trading success is 80% psychology and 20% strategy. Understanding your emotions and biases is crucial.

## Common Psychological Traps

### 1. FOMO (Fear of Missing Out)
Jumping into trades because everyone else is buying, often at the worst time.

**Solution**: Stick to your analysis and strategy. There will always be another opportunity.

### 2. Revenge Trading
Trying to immediately recover losses by making impulsive trades.

**Solution**: Take a break after losses. Clear your head before trading again.

### 3. Overconfidence
After a winning streak, taking excessive risks.

**Solution**: Maintain discipline. Past success doesn't guarantee future results.

### 4. Analysis Paralysis
Over-analyzing to the point of missing opportunities.

**Solution**: Trust your system and take action when conditions are met.

## Developing a Trading Mindset

### Accept Uncertainty
No one can predict the market with 100% accuracy. Accept that losses will happen.

### Focus on Process, Not Outcomes
Judge yourself by whether you followed your plan, not by individual trade results.

### Keep a Trading Journal
Document:
- Entry and exit points
- Reasoning behind trades
- Emotional state
- Lessons learned

### Continuous Learning
Markets evolve. Successful traders never stop learning and adapting.

## Managing Stress

Trading can be stressful. Healthy habits:
- Regular exercise
- Adequate sleep
- Time away from screens
- Social connections
- Hobbies outside of trading

## The Importance of Patience

Good traders wait for high-probability setups. Don't force trades when conditions aren't favorable.

## Building Confidence

Confidence comes from:
1. Backtesting your strategy
2. Paper trading before using real money
3. Starting small and scaling up
4. Consistent results over time

Remember: Trading is a marathon, not a sprint. Sustainable success comes from consistency, discipline, and continuous improvement.
    `
  },
  {
    id: 5,
    title: 'Fee Optimization',
    category: 'Beginner',
    icon: DollarSign,
    content: `
# Fee Optimization: Maximizing Your Profits

## Understanding Trading Fees

Trading fees can significantly impact your profitability, especially for active traders.

## Types of Fees

### 1. Trading Fees
- **Maker Fees**: When you add liquidity to the order book (limit orders)
- **Taker Fees**: When you remove liquidity (market orders)
- Typically 0.1% - 0.5% per trade

### 2. Withdrawal Fees
Fixed or percentage-based fees for moving crypto off the exchange.

### 3. Spread
The difference between buy and sell prices, an indirect fee.

## Fee Impact Example

With 0.1% trading fee:
- Buy $1,000 worth of BTC: Pay $1 fee
- Sell $1,000 worth of BTC: Pay $1 fee
- Total round trip cost: $2 (0.2%)

For 100 trades per month: $200 in fees!

## Optimization Strategies

### 1. Use Limit Orders
Limit orders often have lower fees than market orders.

### 2. Consider Fee Tiers
Many exchanges offer reduced fees for:
- High trading volume
- Holding exchange tokens
- VIP membership levels

### 3. Consolidate Trades
Instead of making many small trades, consider larger, less frequent trades.

### 4. Factor Fees Into Strategy
Calculate break-even points including fees:
- If fees are 0.2% round trip, you need at least 0.2% profit to break even

### 5. Choose the Right Exchange
Compare fee structures across exchanges for your trading style.

## Fee Calculation

On our demo exchange:
- Trading Fee: 0.1% (0.001)
- $1,000 trade = $1 fee
- Break-even point: 0.1% price movement

## Long-term Impact

A trader making 200 trades per year:
- 0.1% fees: $400 annual cost
- 0.2% fees: $800 annual cost
- 0.5% fees: $2,000 annual cost

Choosing lower-fee options can save thousands over time!

## Tax Considerations

Remember that every trade may be a taxable event. Consult with a tax professional about your jurisdiction's cryptocurrency tax laws.
    `
  }
];

const Learn = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    const Icon = article.icon;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelectedArticle(null)}
          className="mb-6 text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
        >
          ← Back to Articles
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <div>
              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {article.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {article.title}
              </h1>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{line.slice(3)}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{line.slice(4)}</h3>;
              } else if (line.startsWith('- ')) {
                return <li key={i} className="text-gray-700 dark:text-gray-300 ml-6">{line.slice(2)}</li>;
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold text-gray-900 dark:text-white my-2">{line.slice(2, -2)}</p>;
              } else if (line.trim() === '') {
                return <br key={i} />;
              } else {
                return <p key={i} className="text-gray-700 dark:text-gray-300 my-3">{line}</p>;
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Master cryptocurrency trading with our comprehensive guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const Icon = article.icon;
          return (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  {article.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h3>

              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:underline">
                Read Article
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Learn;