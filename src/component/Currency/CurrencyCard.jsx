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

  if (status === "loading") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 animate-pulse transition-colors">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow p-5 transition-colors">
        <h3 className="font-semibold mb-1">Currency</h3>
        <p className="text-sm">Unable to load exchange rates</p>
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
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow p-5 space-y-4 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          💱 Currency
        </h3>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {currency}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {primaryRates.map(code => {
          const value = rates[code];
          return (
            <div
              key={code}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm transition-colors"
            >
              <span className="font-semibold">{code}</span>
              <span className="text-gray-600 dark:text-gray-300">
                {value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition rounded-lg py-2 text-gray-700 dark:text-gray-300"
      >
        {open ? "Hide all exchange rates ▲" : "Show all exchange rates ▼"}
      </button>

      {open && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 max-h-72 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allRates.map(code => {
              const value = rates[code];
              return (
                <div
                  key={code}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  <span className="font-medium">{code}</span>
                  <span className="text-gray-600 dark:text-gray-300">
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