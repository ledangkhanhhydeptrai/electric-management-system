"use client";
import React, { useState } from "react";
import {
  Layers,
  Percent,
  Gift,
  Plus,
  Trash2,
  Zap,
  Calendar,
  Users
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

type Dealer = {
  id: string;
  name: string;
  region?: string;
};

type PriceTier = {
  id: string;
  fromQty: number;
  toQty: number | null;
  unitPrice: number;
};

type DiscountPolicy = {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  stackable: boolean;
};

type Promotion = {
  id: string;
  title: string;
  startsAt: string; // YYYY-MM-DD
  endsAt: string; // YYYY-MM-DD
  applyTo: "all" | "selected";
  selectedDealers?: string[];
};

const SAMPLE_DEALERS: Dealer[] = [
  { id: "d-01", name: "Dealer A", region: "North" },
  { id: "d-02", name: "Dealer B", region: "Central" },
  { id: "d-03", name: "Dealer C", region: "South" }
];

export default function DealerPricingPolicyPage() {
  useAuthGuard(["EVM Staff"]);
  const [selectedDealerId, setSelectedDealerId] = useState<string>(
    SAMPLE_DEALERS[0].id
  );

  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([
    { id: "pt-1", fromQty: 1, toQty: 9, unitPrice: 25000 },
    { id: "pt-2", fromQty: 10, toQty: 49, unitPrice: 23000 },
    { id: "pt-3", fromQty: 50, toQty: null, unitPrice: 21000 }
  ]);

  const [discountPolicies, setDiscountPolicies] = useState<DiscountPolicy[]>([
    {
      id: "dp-1",
      name: "Loyalty 5%",
      type: "percentage",
      value: 5,
      stackable: false
    },
    {
      id: "dp-2",
      name: "Bulk - 2M VND",
      type: "fixed",
      value: 2000000,
      stackable: true
    }
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "promo-1",
      title: "Summer Promo - Free Delivery",
      startsAt: new Date().toISOString().slice(0, 10),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        .toISOString()
        .slice(0, 10),
      applyTo: "all"
    }
  ]);

  function addPriceTier(): void {
    const newTier: PriceTier = {
      id: `pt-${Date.now()}`,
      fromQty: 1,
      toQty: null,
      unitPrice: 0
    };
    setPriceTiers((s) => [...s, newTier]);
  }

  function updatePriceTier(id: string, patch: Partial<PriceTier>): void {
    setPriceTiers((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function removePriceTier(id: string): void {
    setPriceTiers((s) => s.filter((t) => t.id !== id));
  }

  function addDiscountPolicy(): void {
    const newDp: DiscountPolicy = {
      id: `dp-${Date.now()}`,
      name: "New Policy",
      type: "percentage",
      value: 0,
      stackable: false
    };
    setDiscountPolicies((s) => [...s, newDp]);
  }

  function updateDiscountPolicy(
    id: string,
    patch: Partial<DiscountPolicy>
  ): void {
    setDiscountPolicies((s) =>
      s.map((d) => (d.id === id ? { ...d, ...patch } : d))
    );
  }

  function removeDiscountPolicy(id: string): void {
    setDiscountPolicies((s) => s.filter((d) => d.id !== id));
  }

  function addPromotion(): void {
    const today = new Date().toISOString().slice(0, 10);
    const later = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      .toISOString()
      .slice(0, 10);
    const newP: Promotion = {
      id: `promo-${Date.now()}`,
      title: "New Promotion",
      startsAt: today,
      endsAt: later,
      applyTo: "selected",
      selectedDealers: [selectedDealerId]
    };
    setPromotions((s) => [...s, newP]);
  }

  function updatePromotion(id: string, patch: Partial<Promotion>): void {
    setPromotions((s) => s.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function removePromotion(id: string): void {
    setPromotions((s) => s.filter((p) => p.id !== id));
  }

  const dealer = SAMPLE_DEALERS.find((d) => d.id === selectedDealerId);

  const formatPrice = (v: number) => v.toLocaleString();

  return (
    <div className="mt-22">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Pricing & Promotions Management
              </h1>
              <p className="text-gray-600">
                Quản lý giá sỉ, chiết khấu và chương trình khuyến mãi theo đại
                lý
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Select Dealer
              </label>
              <select
                className="px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white min-w-[200px] font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={selectedDealerId}
                onChange={(e) => setSelectedDealerId(e.target.value)}
              >
                {SAMPLE_DEALERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} {d.region ? `(${d.region})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Dealer Info Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dealer?.name}</h2>
              <p className="text-blue-100">
                Region: {dealer?.region || "N/A"} • Active Policies & Promotions
                Below
              </p>
            </div>
          </div>
        </div>

        <main className="grid grid-cols-12 gap-6">
          {/* Left: Price Tiers */}
          <section className="col-span-7 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Wholesale Price Tiers
                      </h2>
                      <p className="text-sm text-gray-600">{dealer?.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={addPriceTier}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    Add Tier
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {priceTiers.map((t, index) => (
                  <div
                    key={t.id}
                    className="group relative bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          From Quantity
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          value={t.fromQty}
                          onChange={(e) =>
                            updatePriceTier(t.id, {
                              fromQty: parseInt(e.target.value || "0", 10)
                            })
                          }
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          To Quantity
                        </label>
                        <input
                          type="number"
                          placeholder="∞"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          value={t.toQty ?? ""}
                          onChange={(e) => {
                            const v = e.target.value;
                            updatePriceTier(t.id, {
                              toQty: v === "" ? null : parseInt(v, 10)
                            });
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Unit Price (VND)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-bold text-blue-600 transition-all"
                          value={t.unitPrice}
                          onChange={(e) =>
                            updatePriceTier(t.id, {
                              unitPrice: parseInt(e.target.value || "0", 10)
                            })
                          }
                        />
                      </div>

                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => removePriceTier(t.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Range: {t.fromQty} - {t.toQty ?? "∞"} units
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(t.unitPrice)} VND/unit
                      </span>
                    </div>
                  </div>
                ))}

                {priceTiers.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No price tiers defined. Click Add Tier to start.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right: Discounts & Promotions */}
          <aside className="col-span-5 space-y-6">
            {/* Discount Policies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <Percent className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">
                      Discount Policies
                    </h3>
                  </div>
                  <button
                    onClick={addDiscountPolicy}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {discountPolicies.map((d) => (
                  <div
                    key={d.id}
                    className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <input
                        type="text"
                        className="flex-1 font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-transparent hover:border-gray-300 focus:border-green-500 outline-none px-0 py-1"
                        value={d.name}
                        onChange={(e) =>
                          updateDiscountPolicy(d.id, { name: e.target.value })
                        }
                      />
                      <button
                        onClick={() => removeDiscountPolicy(d.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Type
                        </label>
                        <select
                          className="w-full px-2 py-1.5 border-2 border-gray-300 rounded-lg text-sm focus:border-green-500 transition-all"
                          value={d.type}
                          onChange={(e) =>
                            updateDiscountPolicy(d.id, {
                              type: e.target.value as DiscountPolicy["type"]
                            })
                          }
                        >
                          <option value="percentage">% Percentage</option>
                          <option value="fixed">Fixed Amount</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Value
                        </label>
                        <input
                          type="number"
                          className="w-full px-2 py-1.5 border-2 border-gray-300 rounded-lg text-sm font-bold text-green-600 focus:border-green-500 transition-all"
                          value={d.value}
                          onChange={(e) =>
                            updateDiscountPolicy(d.id, {
                              value: parseFloat(e.target.value || "0")
                            })
                          }
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        checked={d.stackable}
                        onChange={(e) =>
                          updateDiscountPolicy(d.id, {
                            stackable: e.target.checked
                          })
                        }
                      />
                      <span className="font-medium">
                        Can be stacked with other discounts
                      </span>
                    </label>
                  </div>
                ))}

                {discountPolicies.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Percent className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No discount policies</p>
                  </div>
                )}
              </div>
            </div>

            {/* Promotions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-600 p-2 rounded-lg">
                      <Gift className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">Promotions</h3>
                  </div>
                  <button
                    onClick={addPromotion}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Plus className="w-3 h-3" />
                    New Promo
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {promotions.map((p) => (
                  <div
                    key={p.id}
                    className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-gray-900">{p.title}</h4>
                      </div>
                      <button
                        onClick={() => removePromotion(p.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {p.startsAt} → {p.endsAt}
                      </span>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Apply To
                      </label>
                      <select
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:border-purple-500 transition-all"
                        value={p.applyTo}
                        onChange={(e) =>
                          updatePromotion(p.id, {
                            applyTo: e.target.value as Promotion["applyTo"]
                          })
                        }
                      >
                        <option value="all">All Dealers</option>
                        <option value="selected">Selected Dealers</option>
                      </select>
                    </div>

                    {p.applyTo === "selected" && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Selected Dealers
                        </label>
                        <select
                          multiple
                          className="w-full border-2 border-gray-300 rounded-lg p-2 h-24 text-sm focus:border-purple-500 transition-all"
                          value={p.selectedDealers || []}
                          onChange={(e) => {
                            const opts = Array.from(
                              e.target.selectedOptions
                            ).map((o) => o.value);
                            updatePromotion(p.id, { selectedDealers: opts });
                          }}
                        >
                          {SAMPLE_DEALERS.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                {promotions.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Gift className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No promotions defined</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </main>

        {/* Footer Actions */}
        <footer className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
              Save Changes
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
