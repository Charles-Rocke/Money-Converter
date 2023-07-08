// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

// Completed but got stuck on await for the fetch AND the response.json()
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [output, setOutput] = useState("");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  // call api and test it with effects
  useEffect(
    function () {
      async function fetchConverter() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setOutput(data.rates[toCur]);
        setIsLoading(false);
      }
      if (fromCur === toCur) return setOutput(input);
      fetchConverter();
    },
    [input, fromCur, toCur]
  );

  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="Enter amount"
        onChange={(e) => setInput(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(event) => setFromCur(event.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(event) => setToCur(event.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {toCur}
      </p>
    </div>
  );
}
