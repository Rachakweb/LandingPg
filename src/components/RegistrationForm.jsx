import React, { useState, useEffect } from 'react';
import { UserCheck, Wallet, User, Send, Mail, BarChart2, Fingerprint, CheckCircle2 } from 'lucide-react';
import { leadService } from '../services/api';

export default function RegistrationForm({
  connectedWallet,
  onOpenWallet,
  onSuccess,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    email: '',
    experience: 'intermediate',
    wallet: '',
    termsAgreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill wallet input if user connects wallet
  useEffect(() => {
    if (connectedWallet?.fullAddress) {
      setFormData((prev) => ({ ...prev, wallet: connectedWallet.fullAddress }));
    }
  }, [connectedWallet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.telegram.trim() || !formData.email.trim()) {
      onShowToast('Please fill out all required fields.', 'error');
      return;
    }

    if (!formData.termsAgreed) {
      onShowToast('Please accept the disclaimer agreement.', 'error');
      return;
    }

    let formattedTg = formData.telegram.trim();
    if (!formattedTg.startsWith('@')) {
      formattedTg = '@' + formattedTg;
    }

    setIsSubmitting(true);

    try {
      const response = await leadService.submitLead({
        name: formData.name.trim(),
        telegram: formattedTg,
        email: formData.email.trim(),
        experience: formData.experience,
        wallet: formData.wallet.trim() || 'Not connected'
      });

      if (response.success) {
        onSuccess(response.data);
        onShowToast('VIP Pass Approved! Instant Telegram Access Granted.', 'success');
        setFormData({
          name: '',
          telegram: '',
          email: '',
          experience: 'intermediate',
          wallet: connectedWallet?.fullAddress || '',
          termsAgreed: false
        });
      }
    } catch (err) {
      console.error(err);
      onShowToast('Failed to register. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Member Registration & Connection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
            Reserve Your <span className="text-gold-gradient">VIP Alpha Pass</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Complete your registration below to link your Telegram account, secure early platform beta access, and receive private channel credentials.
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative">
          
          {/* Wallet Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Connect Web3 Wallet (Optional)</h5>
                <p className="text-xs text-slate-400 font-light">
                  Auto-fill your wallet address for on-chain VIP verification and future token airdrop snapshot.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenWallet}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-amber-300 font-mono transition-all shrink-0"
            >
              {connectedWallet ? `Connected: ${connectedWallet.address}` : 'Connect Wallet'}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Full Name / Alias <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Alex Vance"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Telegram Handle <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Send className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    required
                    placeholder="@crypto_alpha"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="trader@projectx.io"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Trading Experience Level
                </label>
                <div className="relative">
                  <BarChart2 className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  >
                    <option value="intermediate">Intermediate (1-3 Years Trading)</option>
                    <option value="beginner">Beginner (Learning Basics)</option>
                    <option value="advanced">Advanced / Pro Trader (3+ Years)</option>
                    <option value="whale">Institutional / Whale Portfolio ($100k+)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Web3 Wallet Address (Optional)
              </label>
              <div className="relative">
                <Fingerprint className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
                  placeholder="0x... or Solana Address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-slate-400">
              <input
                type="checkbox"
                id="reg-terms-react"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                required
                className="mt-1 rounded bg-slate-900 border-white/20 text-amber-500 focus:ring-amber-400 focus:ring-offset-0"
              />
              <label htmlFor="reg-terms-react">
                I agree to receive verified trading signals and insider market alerts. I acknowledge crypto trading carries financial risk and ProjectX provides educational trading intelligence.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold-shimmer w-full py-4 text-base font-extrabold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 shadow-2xl disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5 fill-slate-950" />
              <span>
                {isSubmitting
                  ? 'Verifying VIP Credentials...'
                  : 'Complete Registration & Get Telegram Access'}
              </span>
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

