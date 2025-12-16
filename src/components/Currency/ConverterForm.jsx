import React, { useState } from "react";

const ConverterForm = ({ rates, base }) => {
  const [amount, setAmount] = useState(1);
  const [target, setTarget] = useState(Object.keys(rates)[0]);

  if (!rates) return null;

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleTargetChange = (e) => setTarget(e.target.value);

  const converted = (amount * rates[target]).toFixed(2);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-4">
      <h3 className="font-semibold text-lg mb-2">Currency Converter</h3>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="border p-2 rounded w-full sm:w-32"
        />
        <span>{base} →</span>
        <select
          value={target}
          onChange={handleTargetChange}
          className="border p-2 rounded"
        >
          {Object.keys(rates).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <span className="font-semibold text-lg">{converted}</span>
      </div>
    </div>
  );
};

export default ConverterForm;
