import { INITIAL_TICKER_COINS } from '../data/cryptoData';

export const cryptoService = {
  /**
   * Fetches real-time cryptocurrency quotes from CoinGecko API
   * with graceful fallback to simulated market rates.
   */
  async getMarketPrices() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h',
        { headers: { Accept: 'application/json' } }
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item) => ({
            symbol: item.symbol.toUpperCase(),
            name: item.name,
            price: item.current_price,
            change24h: item.price_change_percentage_24h || 0
          }));
        }
      }
    } catch (err) {
      console.info('CoinGecko API offline/throttled. Using high-fidelity simulated feeds:', err.message);
    }

    return INITIAL_TICKER_COINS;
  },

  /**
   * Applies realistic price micro-fluctuations for a live trading feel
   */
  simulateMicroTicks(coins) {
    return coins.map((c) => {
      const fluctuation = (Math.random() - 0.49) * 0.002;
      const newPrice = +(c.price * (1 + fluctuation)).toFixed(2);
      const newChange = +(c.change24h + (Math.random() - 0.5) * 0.05).toFixed(2);
      return {
        ...c,
        price: newPrice,
        change24h: newChange
      };
    });
  }
};

