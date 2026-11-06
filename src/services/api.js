/**
 * ProjectX Central API Service Layer
 * Designed for effortless backend, database (PostgreSQL, Supabase, Firebase, MongoDB),
 * or Telegram Bot webhook integrations.
 */

const STORAGE_KEY = 'projectx_vip_leads';

export const leadService = {
  /**
   * Submit VIP registration lead.
   * Can be hooked to a backend endpoint or Telegram bot webhook.
   */
  async submitLead(leadData) {
    // 1. Simulating an asynchronous network call / database transaction
    await new Promise((resolve) => setTimeout(resolve, 800));

    const payload = {
      ...leadData,
      id: 'lead_' + Date.now(),
      registeredAt: new Date().toISOString(),
      status: 'approved',
      tier: 'Alpha VIP Platinum'
    };

    // 2. Persist locally in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // 3. Optional: forward to webhook if environment variable is configured
    const webhookUrl = import.meta.env?.VITE_TELEGRAM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Failed to notify webhook:', err);
      }
    }

    return {
      success: true,
      data: payload
    };
  },

  /**
   * Retrieve stored leads (useful for admin panel)
   */
  getStoredLeads() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }
};

