import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const TradingViewChart = ({ symbol = 'BTC' }) => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const symbolMap = {
      'BTC': 'BINANCE:BTCUSDT',
      'ETH': 'BINANCE:ETHUSDT',
      'USDT': 'BINANCE:USDTUSD',
      'BNB': 'BINANCE:BNBUSDT',
      'ADA': 'BINANCE:ADAUSDT',
      'SOL': 'BINANCE:SOLUSDT',
      'XRP': 'BINANCE:XRPUSDT',
      'DOT': 'BINANCE:DOTUSDT',
      'DOGE': 'BINANCE:DOGEUSDT',
      'AVAX': 'BINANCE:AVAXUSDT',
      'LINK': 'BINANCE:LINKUSDT',
      'MATIC': 'BINANCE:MATICUSDT'
    };

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbolMap[symbol] || 'BINANCE:BTCUSDT',
          interval: '60',
          timezone: 'Etc/UTC',
          theme: isDark ? 'dark' : 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: isDark ? '#1f2937' : '#f3f4f6',
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: containerRef.current.id,
          hide_side_toolbar: false,
          studies: ['MASimple@tv-basicstudies'],
          disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_search_hot_key'],
          enabled_features: ['hide_left_toolbar_by_default']
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, isDark]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div id={`tradingview_${symbol}`} ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default TradingViewChart;