# ProjectX — React Architecture & Scaling Guide

Welcome to the **React Edition** of **ProjectX**, a high-performance crypto trading landing page for your Telegram syndicate and upcoming trading terminal.

---

## 🏗️ Architecture Overview

The codebase is built with **React 18 + Vite + Tailwind CSS + Lucide Icons**. It is structured for scalability when adding more content, backend APIs, or databases.

```
Landing page/
├── dist/                     # Optimized static production build
├── public/                   # Static assets & icons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Responsive navigation & mobile drawer
│   │   ├── ParticleBackground.jsx  # Interactive constellation canvas
│   │   ├── CryptoTicker.jsx        # Live CoinGecko API marquee ticker
│   │   ├── Hero.jsx                # High-impact value proposition & metrics
│   │   ├── TelegramSignalCard.jsx  # Interactive live Telegram signal preview
│   │   ├── Community.jsx           # Insider tips, whale tracking & audio briefs
│   │   ├── NewsSlideshow.jsx       # Advanced UI slideshow with category filters
│   │   ├── TradingTerminal.jsx     # Candlestick chart & live order book
│   │   ├── RegistrationForm.jsx    # VIP pass registration & Web3 autofill
│   │   ├── Footer.jsx              # Social links, disclaimers & quick nav
│   │   ├── WalletModal.jsx         # Web3 wallet selector (MetaMask, Phantom, etc.)
│   │   ├── NewsModal.jsx           # Full alpha intelligence story modal
│   │   ├── SuccessModal.jsx        # Registration approval modal with confetti
│   │   └── Toast.jsx               # Non-intrusive floating toasts
│   ├── data/
│   │   ├── cryptoData.js           # Market ticker fallback & audited metrics
│   │   └── newsData.js             # Curated crypto news feed & categories
│   ├── services/
│   │   ├── api.js                  # Central database & webhook service layer
│   │   └── cryptoService.js        # CoinGecko integration & micro-tick simulator
│   ├── App.jsx                     # Root application state & modal coordinator
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Tailwind directives & luxury styling
├── index.html                      # HTML entry with SEO metadata
├── tailwind.config.js              # Custom gold/obsidian/emerald theme
├── vite.config.js                  # Fast HMR build configuration
└── package.json                    # Dependencies & scripts
```

---

## ⚡ How to Run

### Development Mode (with Instant Hot Module Reload)
```bash
npm run dev
```
Open `http://localhost:3000` (or the port Vite prints in your console).

### Production Build
```bash
npm run build
```
Creates an optimized production bundle inside the `/dist` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🔌 Connecting Databases & External Technologies

The project is structured to make integrating a database or backend simple:

### 1. Telegram Bot / Webhook Integration
To send leads directly into your private Telegram admin group or CRM:
- Create a `.env` file in the root directory:
  ```env
  VITE_TELEGRAM_WEBHOOK_URL=https://your-backend-api.com/api/telegram-webhook
  ```
- Look at [`src/services/api.js`](file:///d:/Landing%20page/src/services/api.js): `leadService.submitLead` already supports forwarding submissions to your webhook!

### 2. Supabase / Firebase / PostgreSQL
In [`src/services/api.js`](file:///d:/Landing%20page/src/services/api.js), replace the `localStorage` fallback with your client library:
```javascript
// Example Supabase integration:
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const leadService = {
  async submitLead(leadData) {
    const { data, error } = await supabase.from('vip_leads').insert([leadData])
    if (error) throw error
    return { success: true, data }
  }
}
```

### 3. Real Web3 Provider (`wagmi`, `@solana/wallet-adapter`)
The `WalletModal.jsx` and `Navbar.jsx` components are cleanly separated with callback props (`onConnect`, `connectedWallet`, `onDisconnectWallet`), making it simple to plug in real Web3 providers.

---

## 🔗 Official Telegram Link
- Community Channel: [https://t.me/+Kgdr1-eDxwNhYTg1](https://t.me/+Kgdr1-eDxwNhYTg1)
