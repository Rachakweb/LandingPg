import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import CryptoTicker from './components/CryptoTicker';
import Hero from './components/Hero';
import Community from './components/Community';
import NewsSlideshow from './components/NewsSlideshow';
import TradingTerminal from './components/TradingTerminal';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import NewsModal from './components/NewsModal';
import SuccessModal from './components/SuccessModal';
import Toast from './components/Toast';

export default function App() {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [registeredData, setRegisteredData] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast dispatch helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleWalletConnect = (walletInfo) => {
    setConnectedWallet(walletInfo);
    showToast(`Wallet Connected: ${walletInfo.address} (${walletInfo.provider})`, 'success');
  };

  const handleWalletDisconnect = () => {
    setConnectedWallet(null);
    showToast('Wallet disconnected', 'info');
  };

  return (
    <div className="bg-obsidian-950 text-slate-100 min-h-screen relative selection:bg-amber-500 selection:text-black">
      {/* Background Interactive Particles */}
      <ParticleBackground />

      {/* Floating Toast Notification Engine */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Responsive Navigation */}
      <Navbar
        onOpenWallet={() => setWalletModalOpen(true)}
        connectedWallet={connectedWallet}
        onDisconnectWallet={handleWalletDisconnect}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <CryptoTicker />
        <Hero />
        <Community />
        <NewsSlideshow onSelectNews={(news) => setSelectedNews(news)} />
        <TradingTerminal />
        <RegistrationForm
          connectedWallet={connectedWallet}
          onOpenWallet={() => setWalletModalOpen(true)}
          onSuccess={(data) => setRegisteredData(data)}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      <NewsModal
        newsItem={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      <SuccessModal
        data={registeredData}
        onClose={() => setRegisteredData(null)}
      />
    </div>
  );
}

