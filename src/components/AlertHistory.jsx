import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./google-sign-in/config";
import { useEffect, useState } from "react";

const AlertHistory = ({ refreshTrigger, userId }) => {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 5;

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!userId) return;
      try {
        const alertsRef = collection(db, "rateAlerts");
        const q = query(
          alertsRef,
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const alertsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, [refreshTrigger]);

  const totalPages = Math.ceil(alerts.length / alertsPerPage);
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);

  if (!userId) {
    return (
      <div className="bg-[#222222] text-white p-8 max-w-4xl mx-auto rounded-3xl mt-8 text-center">
        <h2 className="text-xl">Please sign in to view your alerts</h2>
      </div>
    );
  }

  return (
    <div className=" text-white p-8 max-w-3xl mx-auto rounded-3xl mt-8">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Previous alerts</h2>

        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg ${
                currentPage === i + 1 ? "bg-violet-500" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {currentAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-[#222222] rounded-xl p-6 hover:bg-[#333333] transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium mb-2">{alert.title}</h3>
                <div className="text-3xl font-bold mb-2">
                  ₹{alert.targetRate}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{alert.country.flag}</span>
                  <span>{alert.country.name}</span>
                  <span className="text-gray-500">({alert.country.code})</span>
                </div>
              </div>
              <div className="text-gray-500">
                {new Date(alert.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertHistory;
