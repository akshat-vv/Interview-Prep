import React, { useState } from "react";

const API_URL = "https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten";
 // CleanURI public CORS-enabled API

const URLShortener = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!isValidUrl(inputUrl)) {
      setError("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: inputUrl }),
      });
      const data = await res.json();
      if (data.result_url) {
        setShortUrl(data.result_url);
      } else {
        setError("Failed to shorten URL.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl shadow-lg bg-white mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">URL Shortener</h2>
      <input
        type="text"
        className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring"
        placeholder="Enter long URL..."
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        aria-label="URL input"
      />
      <button
        onClick={handleShorten}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {shortUrl && (
        <div className="mt-4 bg-gray-100 p-3 rounded flex items-center justify-between">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline truncate"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="ml-2 text-sm bg-green-600 text-white px-2 py-1 rounded"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default URLShortener;
