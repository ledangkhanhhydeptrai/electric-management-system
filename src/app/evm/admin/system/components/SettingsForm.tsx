"use client";

import React, { useState } from "react";
import {
  Globe,
  Percent,
  DollarSign,
  Save,
  Settings,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  Shield,
  Palette,
  Languages
} from "lucide-react";

export default function SettingsForm() {
  const [siteName, setSiteName] = useState("EVM System");
  const [taxRate, setTaxRate] = useState(10);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<
    "success" | "error" | "info"
  >("success");

  const showNotification = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
    setTimeout(() => setNotificationOpen(false), 4000);
  };

  const handleSave = () => {
    try {
      showNotification(
        `Settings saved successfully! ${siteName}, Tax: ${taxRate}%, Currency: ${defaultCurrency}`,
        "success"
      );
    } catch (error) {
      console.error("Error:", error);
      showNotification("Failed to save settings. Please try again.", "error");
    }
  };

  const handleReset = () => {
    setSiteName("EVM System");
    setTaxRate(10);
    setDefaultCurrency("USD");
    setLanguage("en");
    setTheme("light");
    setEmailNotifications(true);
    setTwoFactorAuth(false);
    showNotification("Settings reset to defaults", "info");
  };

  return (
    <div className="">
      {/* Custom Notification */}
      {notificationOpen && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${
              notificationSeverity === "success"
                ? "bg-green-500 text-white"
                : notificationSeverity === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {notificationSeverity === "success" && (
              <CheckCircle className="w-6 h-6" />
            )}
            {notificationSeverity === "error" && (
              <XCircle className="w-6 h-6" />
            )}
            {notificationSeverity === "info" && <Info className="w-6 h-6" />}
            <span className="font-medium">{notificationMessage}</span>
            <button
              onClick={() => setNotificationOpen(false)}
              className="ml-4 hover:bg-white/20 p-1 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              System Settings
            </h1>
            <p className="text-slate-600 mt-1">
              Configure your application preferences and options
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* General Settings */}
          <div className="lg:col-span-2 p-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  General Settings
                </h2>
                <p className="text-sm text-slate-600">
                  Basic configuration options
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Site Name */}
              <div>
                <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 font-medium"
                  placeholder="Enter your site name"
                />
                <p className="text-xs text-slate-500 mt-1">
                  This name will appear in the header and browser tab
                </p>
              </div>

              {/* Tax Rate & Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <Percent className="w-5 h-5 text-emerald-600" />
                    Tax Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 font-medium"
                      placeholder="10"
                      min={0}
                      max={100}
                    />
                    <div className="absolute right-4 top-3 text-slate-400 font-bold">
                      %
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Default Currency
                  </label>
                  <select
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="VND">🇻🇳 VND - Vietnamese Dong</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                  </select>
                </div>
              </div>

              {/* Language & Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <Languages className="w-5 h-5 text-emerald-600" />
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <Palette className="w-5 h-5 text-green-600" />
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="light">☀️ Light Mode</option>
                    <option value="dark">🌙 Dark Mode</option>
                    <option value="auto">🔄 Auto (System)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Security */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Notifications
                </h3>
              </div>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">
                    Email Notifications
                  </div>
                  <div className="text-xs text-slate-500">
                    Receive updates via email
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
              </label>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Security</h3>
              </div>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">
                    Two-Factor Auth
                  </div>
                  <div className="text-xs text-slate-500">
                    Extra security layer
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
              </label>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Last saved</span>
                  <span className="font-bold">2 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total settings</span>
                  <span className="font-bold">7 options</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Status</span>
                  <span className="px-3 py-1 bg-green-300 rounded-full text-xs font-bold text-green-900">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              <span className="font-semibold">Tip:</span> Changes will be
              applied immediately after saving
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
              >
                Reset to Defaults
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
