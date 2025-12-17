import React, { useEffect, useState } from "react";

const EXCHANGE_KEY = import.meta.env.VITE_EXCHANGERATE_KEY;
const COMMON_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD"];

export default function CurrencyCard({ countryCode }) {
  const [currency, setCurrency] = useState(null);
  const [rates, setRates] = useState(null);
  const [status, setStatus] = useState("idle");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!countryCode) return;

    let cancelled = false;

    async function loadCurrencyAndRates() {
      setStatus("loading");
      setOpen(false);

      try {
        const resCountry = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!resCountry.ok) throw new Error("Country fetch failed");

        const countryData = await resCountry.json();
        if (cancelled) return;

        const localCurrency = Object.keys(
          countryData[0]?.currencies || {}
        )[0];

        if (!localCurrency) throw new Error("Currency not found");

        setCurrency(localCurrency);

        const resRates = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_KEY}/latest/${localCurrency}`
        );
        const rateData = await resRates.json();

        if (rateData?.result !== "success") {
          throw new Error("Exchange rate fetch failed");
        }

        if (!cancelled) {
          setRates(rateData.conversion_rates);
          setStatus("success");
        }
      } catch (err) {
        console.error("Currency error:", err);
        if (!cancelled) setStatus("error");
      }
    }

    loadCurrencyAndRates();
    return () => (cancelled = true);
  }, [countryCode]);

  /* ---------- States ---------- */

  if (status === "loading") {
    return (
      <div className="bg-white rounded-2xl shadow p-6 animate-pulse">
        <div className="h-5 w-32 bg-slate-200 rounded mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-9 bg-slate-100 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-1">Currency</h3>
        <p className="text-sm">
          Unable to load exchange rates for this destination.
        </p>
      </div>
    );
  }

  if (!currency || !rates) return null;

  const primaryRates = COMMON_CURRENCIES.filter(c => c in rates);
  const allRates = [
    ...primaryRates,
    ...Object.keys(rates).filter(c => !COMMON_CURRENCIES.includes(c)),
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          💱 Currency
        </h3>
        <span className="text-sm font-medium text-slate-500">
          {currency}
        </span>
      </div>

      {/* Main rates */}
      <div className="grid grid-cols-2 gap-3">
        {primaryRates.map(code => {
          const value = rates[code];
          return (
            <div
              key={code}
              className="flex justify-between items-center
                         bg-slate-50 rounded-lg px-3 py-2 text-sm"
            >
              <span className="font-semibold">{code}</span>
              <span className="text-slate-600">
                {value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-sm font-medium
                   bg-slate-100 hover:bg-slate-200 transition
                   rounded-lg py-2"
      >
        {open ? "Hide all exchange rates ▲" : "Show all exchange rates ▼"}
      </button>

      {/* Expanded list */}
      {open && (
        <div className="border-t pt-4 max-h-72 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allRates.map(code => {
              const value = rates[code];
              return (
                <div
                  key={code}
                  className="flex justify-between items-center
                             bg-slate-50 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="font-medium">{code}</span>
                  <span className="text-slate-600">
                    {value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
