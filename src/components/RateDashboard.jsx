import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RateAlertModal from "./RateAlertModal";
import AlertHistory from "./AlertHistory";

const countries = [
  { code: "GBP", name: "UK", flag: "🇬🇧", apiCode: "GBPINR=X" },
  { code: "AED", name: "UAE", flag: "🇦🇪", apiCode: "AEDINR=X" },
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="text-gray-400">{label}</p>
        <p className="text-green-400 font-semibold">
          ₹{payload[0].value.toFixed(4)}
        </p>
        <div className="text-sm text-gray-400">
          <p>High: ₹{payload[0].payload.high.toFixed(4)}</p>
          <p>Low: ₹{payload[0].payload.low.toFixed(4)}</p>
          <p>Open: ₹{payload[0].payload.open.toFixed(4)}</p>
        </div>
      </div>
    );
  }
  return null;
};

const RateDashboard = ({ user }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [rateHistory, setRateHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAlertCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchRateHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(
          `${baseUrl}/api/currency-converter/forex?code=${selectedCountry.apiCode}&timeline=1M`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            // credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch rate history");
        }

        const data = await response.json();

        const transformedData = data
          .map((item) => ({
            date: formatDate(item.resDate),
            rate: parseFloat(item.close),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            open: parseFloat(item.open),
            rawDate: new Date(item.resDate),
          }))
          .sort((a, b) => a.rawDate - b.rawDate);

        setRateHistory(transformedData);
        const latestRate = transformedData[transformedData.length - 1];
        setCurrentRate(latestRate?.rate);
      } catch (err) {
        setError("Failed to load exchange rate data");
        console.error("Error fetching rate history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRateHistory();
  }, [selectedCountry]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-[#222222] text-white p-8 max-w-4xl mx-auto rounded-3xl">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            {error}
          </div>
        </div>

        <AlertHistory refreshTrigger={refreshTrigger} userId={user.uid} />
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Rate alert dashboard
      </h1>

      <div className="bg-[#222222] text-white p-8 max-w-3xl mx-auto rounded-3xl">
        {/* Country Selector */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-[#393939] rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
          >
            <span className="text-2xl">{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
            <span className="text-gray-500">{selectedCountry.code}</span>
            <img src="./arrow-down.svg" alt="arrow-down" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-xl z-10">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-gray-500">{country.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="rounded-2xl p-6">
          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rateHistory}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      stroke="#666"
                      tick={{ fill: "#666" }}
                      tickLine={{ stroke: "#666" }}
                    />
                    <YAxis
                      stroke="#666"
                      tick={{ fill: "#666" }}
                      tickLine={{ stroke: "#666" }}
                      domain={["auto", "auto"]}
                      tickFormatter={(value) => `₹${value.toFixed(2)}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#4ade80"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8, fill: "#4ade80" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Current Rate Display */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-4xl font-bold">
                  ₹{currentRate?.toFixed(2)}
                </div>
                <button
                  onClick={() => setIsAlertModalOpen(true)}
                  className="bg-green-400 hover:bg-green-500 text-black px-6 py-2 rounded-full flex items-center space-x-2 transition-colors"
                >
                  <span>Set alert</span>
                  <span className="text-xl">+</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <RateAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        selectedCountry={selectedCountry}
        onAlertCreated={handleAlertCreated}
        userId={user.uid}
      />
      <AlertHistory refreshTrigger={refreshTrigger} userId={user.uid} />
    </>
  );
};

export default RateDashboard;
