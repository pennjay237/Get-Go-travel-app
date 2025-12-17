import React, { useEffect, useState } from "react";

const EXCHANGE_KEY = import.meta.env.VITE_EXCHANGERATE_KEY;

export default function CurrencyCard({ countryCode }) {
  const [currency, setCurrency] = useState(null);
  const [currencyName, setCurrencyName] = useState("");
  const [rates, setRates] = useState(null);
  const [status, setStatus] = useState("idle");
  const [compareCurrency, setCompareCurrency] = useState("USD");
  const [convertedValue, setConvertedValue] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  const COMMON_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"];

  useEffect(() => {
    if (!countryCode) return;
    let cancelled = false;

    async function loadCurrencyAndRates() {
      setStatus("loading");

      try {
        const resCountry = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!resCountry.ok) throw new Error("Country fetch failed");
        const countryData = await resCountry.json();
        if (cancelled) return;

        const localCurrencyCode = Object.keys(countryData[0]?.currencies || {})[0];
        const localCurrencyName = countryData[0]?.currencies?.[localCurrencyCode]?.name || localCurrencyCode;
        
        if (!localCurrencyCode) throw new Error("Currency not found");
        
        setCurrency(localCurrencyCode);
        setCurrencyName(localCurrencyName);

        const resRates = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_KEY}/latest/${localCurrencyCode}`
        );
        const rateData = await resRates.json();
        
        if (rateData?.result !== "success") {
          throw new Error("Exchange rate fetch failed");
        }

        if (!cancelled) {
          setRates(rateData.conversion_rates);
          
          const currencies = Object.keys(rateData.conversion_rates || {});
          setAvailableCurrencies(currencies);
          
          if (currencies.includes("USD")) {
            setCompareCurrency("USD");
          } else if (currencies.length > 0) {
            setCompareCurrency(currencies[0]);
          }
          
          if (rateData.conversion_rates["USD"]) {
            setConvertedValue(rateData.conversion_rates["USD"]);
          }
          
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

  useEffect(() => {
    if (rates && compareCurrency) {
      const rate = rates[compareCurrency];
      if (rate) {
        const inputNum = parseFloat(inputValue) || 0;
        setConvertedValue((inputNum * rate).toFixed(4));
      }
    }
  }, [compareCurrency, inputValue, rates]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const swapCurrencies = () => {
    if (rates && compareCurrency && currency) {
      const newRate = 1 / rates[compareCurrency];
      const inputNum = parseFloat(inputValue) || 0;
      setConvertedValue((inputNum * newRate).toFixed(4));
      
      const temp = currency;
      setCurrency(compareCurrency);
      setCompareCurrency(temp);
      
      fetchNewRates(temp);
    }
  };

  const fetchNewRates = async (newBaseCurrency) => {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${EXCHANGE_KEY}/latest/${newBaseCurrency}`
      );
      const data = await res.json();
      if (data?.result === "success") {
        setRates(data.conversion_rates);
        setAvailableCurrencies(Object.keys(data.conversion_rates || {}));
      }
    } catch (err) {
      console.error("Failed to fetch new rates:", err);
    }
  };

  if (status === "loading") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse transition-colors">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow-lg p-6 transition-colors">
        <h3 className="font-semibold text-lg mb-2">Currency Exchange</h3>
        <p className="text-sm">Unable to load exchange rates. Please try again later.</p>
      </div>
    );
  }

  if (!currency || !rates || !currencyName) return null;

  const availableCommonCurrencies = COMMON_CURRENCIES.filter(c => 
    c !== currency && rates[c]
  );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-6 space-y-6 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          💱 Currency Exchange
        </h3>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {currency} ({currencyName})
        </span>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Convert {currency} to other currencies
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount in {currency}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter amount"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                  {currency}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Swap currencies"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Converted Amount
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                <div className="text-lg font-semibold">
                  {convertedValue} {compareCurrency}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Rate: 1 {currency} = {rates[compareCurrency]?.toFixed(4)} {compareCurrency}
                </div>
              </div>
              <div className="w-32">
                <select
                  value={compareCurrency}
                  onChange={(e) => setCompareCurrency(e.target.value)}
                  className="w-full px-3 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {availableCommonCurrencies.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Conversions (1 {currency})
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {availableCommonCurrencies.slice(0, 6).map((code) => (
            <div
              key={code}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg px-3 py-2.5 transition-colors cursor-pointer"
              onClick={() => {
                setCompareCurrency(code);
                setInputValue("1");
              }}
            >
              <span className="font-semibold">{code}</span>
              <span className="text-gray-600 dark:text-gray-300">
                {rates[code]?.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Exchange rates are updated in real-time
        </p>
      </div>
    </div>
  );
}