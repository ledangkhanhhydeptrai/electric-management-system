"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Percent,
  Gift,
  Trash2,
  Plus,
  Save,
  TrendingUp,
  Tag,
  Calendar,
  MapPin
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
  toQty?: number | null;
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
  startsAt: string;
  endsAt: string;
  applyTo: "all" | "selected";
  selectedDealers?: string[];
};

const SAMPLE_DEALERS: Dealer[] = [
  { id: "d-01", name: "Dealer A", region: "North" },
  { id: "d-02", name: "Dealer B", region: "Central" },
  { id: "d-03", name: "Dealer C", region: "South" }
];

export default function DealerPricingPolicyPage() {
  useAuthGuard(["Administrator"]);
  const [selectedDealerId, setSelectedDealerId] = useState<string>(
    SAMPLE_DEALERS[0].id
  );
  const [editingTier, setEditingTier] = useState<string | null>(null);

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

  function addPriceTier() {
    const newTier: PriceTier = {
      id: `pt-${Date.now()}`,
      fromQty: 1,
      toQty: null,
      unitPrice: 0
    };
    setPriceTiers((s) => [...s, newTier]);
    setEditingTier(newTier.id);
  }

  function updatePriceTier(id: string, patch: Partial<PriceTier>) {
    setPriceTiers((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function removePriceTier(id: string) {
    setPriceTiers((s) => s.filter((t) => t.id !== id));
  }

  function addDiscountPolicy() {
    const newDp: DiscountPolicy = {
      id: `dp-${Date.now()}`,
      name: "New Policy",
      type: "percentage",
      value: 0,
      stackable: false
    };
    setDiscountPolicies((s) => [...s, newDp]);
  }

  function updateDiscountPolicy(id: string, patch: Partial<DiscountPolicy>) {
    setDiscountPolicies((s) =>
      s.map((d) => (d.id === id ? { ...d, ...patch } : d))
    );
  }

  function removeDiscountPolicy(id: string) {
    setDiscountPolicies((s) => s.filter((d) => d.id !== id));
  }

  function addPromotion() {
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

  function updatePromotion(id: string, patch: Partial<Promotion>) {
    setPromotions((s) => s.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function removePromotion(id: string) {
    setPromotions((s) => s.filter((p) => p.id !== id));
  }

  const dealer = SAMPLE_DEALERS.find((d) => d.id === selectedDealerId)!;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  return (
    <div className="mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Pricing & Promotions Management
            </h1>
            <p className="text-slate-600">
              Quản lý giá sỉ, chiết khấu và chương trình khuyến mãi theo đại lý
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <select
                className="px-4 py-2.5 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none transition-colors bg-white"
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
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        {/* Left: Price Tiers */}
        <section className="col-span-7">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Wholesale Price Tiers
                  </h2>
                  <p className="text-sm text-slate-600">{dealer.name}</p>
                </div>
              </div>
              <button
                onClick={addPriceTier}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Tier
              </button>
            </div>

            <div className="space-y-4">
              {priceTiers.map((t, idx) => (
                <div
                  key={t.id}
                  className="group bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                      {idx + 1}
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">
                          From Quantity
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                          value={t.fromQty}
                          onChange={(e) =>
                            updatePriceTier(t.id, {
                              fromQty: parseInt(e.target.value || "0", 10)
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">
                          To Quantity
                        </label>
                        <input
                          type="number"
                          placeholder="Unlimited"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                          value={t.toQty ?? ""}
                          onChange={(e) =>
                            updatePriceTier(t.id, {
                              toQty: e.target.value
                                ? parseInt(e.target.value, 10)
                                : null
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">
                          Unit Price (VNĐ)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                          value={t.unitPrice}
                          onChange={(e) =>
                            updatePriceTier(t.id, {
                              unitPrice: parseInt(e.target.value || "0", 10)
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">
                          Price per unit
                        </div>
                        <div className="font-bold text-slate-800">
                          {formatCurrency(t.unitPrice)}
                        </div>
                      </div>
                      <button
                        onClick={() => removePriceTier(t.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {priceTiers.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>
                    No price tiers defined. Click button Add Tier to create one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right column: Discounts & Promotions */}
        <aside className="col-span-5 space-y-6">
          {/* Discount Policies */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Percent className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Discount Policies
                  </h3>
                  <p className="text-sm text-slate-600">{dealer.name}</p>
                </div>
              </div>
              <button
                onClick={addDiscountPolicy}
                className="px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {discountPolicies.map((d) => (
                <div
                  key={d.id}
                  className="border-2 border-slate-200 rounded-xl p-4 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <input
                      className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg font-medium focus:border-green-500 focus:outline-none"
                      value={d.name}
                      onChange={(e) =>
                        updateDiscountPolicy(d.id, { name: e.target.value })
                      }
                      placeholder="Policy name"
                    />
                    <button
                      onClick={() => removeDiscountPolicy(d.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:outline-none"
                        value={d.type}
                        onChange={(e) =>
                          updateDiscountPolicy(d.id, {
                            type: e.target.value as "percentage" | "fixed"
                          })
                        }
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Value
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:outline-none"
                        value={d.value}
                        onChange={(e) =>
                          updateDiscountPolicy(d.id, {
                            value: parseFloat(e.target.value || "0")
                          })
                        }
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 mt-3 text-sm font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                      checked={d.stackable}
                      onChange={(e) =>
                        updateDiscountPolicy(d.id, {
                          stackable: e.target.checked
                        })
                      }
                    />
                    Stackable with other discounts
                  </label>
                </div>
              ))}

              {discountPolicies.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <Tag className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No discount policies yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Promotions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Promotions
                  </h3>
                  <p className="text-sm text-slate-600">Active campaigns</p>
                </div>
              </div>
              <button
                onClick={addPromotion}
                className="px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {promotions.map((p) => (
                <div
                  key={p.id}
                  className="border-2 border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <input
                        className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg font-medium focus:border-purple-500 focus:outline-none mb-2"
                        value={p.title}
                        onChange={(e) =>
                          updatePromotion(p.id, { title: e.target.value })
                        }
                        placeholder="Promotion title"
                      />
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{p.startsAt}</span>
                        <span>→</span>
                        <span>{p.endsAt}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removePromotion(p.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">
                      Apply To
                    </label>
                    <select
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      value={p.applyTo}
                      onChange={(e) =>
                        updatePromotion(p.id, {
                          applyTo: e.target.value as "all" | "selected"
                        })
                      }
                    >
                      <option value="all">All Dealers</option>
                      <option value="selected">Selected Dealers</option>
                    </select>
                  </div>

                  {p.applyTo === "selected" && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Selected Dealers
                      </label>
                      <select
                        multiple
                        className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-purple-500 focus:outline-none"
                        value={p.selectedDealers || []}
                        onChange={(e) => {
                          const opts = Array.from(e.target.selectedOptions).map(
                            (o) => o.value
                          );
                          updatePromotion(p.id, { selectedDealers: opts });
                        }}
                      >
                        {SAMPLE_DEALERS.map((d) => (
                          <option key={d.id} value={d.id} className="py-1">
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}

              {promotions.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <Gift className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No active promotions</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Actions */}
      <footer className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Last updated: {new Date().toLocaleString("vi-VN")}
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
