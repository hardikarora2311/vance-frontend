import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./google-sign-in/config";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 blur-3xl"
        onClick={onClose}
      ></div>

      <div className="relative z-50 bg-[#333333] rounded-xl p-6 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
};

const RateAlertModal = ({
  isOpen,
  onClose,
  selectedCountry,
  onAlertCreated,
  userId,
}) => {
  const [title, setTitle] = useState("");
  const [targetRate, setTargetRate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("No user logged in");
      return;
    }
    setIsSubmitting(true);

    try {
      const alertData = {
        title,
        targetRate: parseFloat(targetRate),
        country: selectedCountry,
        createdAt: new Date().toISOString(),
        status: "active",
        userId: userId,
      };

      await addDoc(collection(db, "rateAlerts"), alertData);
      onAlertCreated();
      onClose();
      setTitle("");
      setTargetRate("");
    } catch (error) {
      console.error("Error creating alert:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Set Rate alert!</h2>

        <div className="flex items-center space-x-2 mb-6 justify-center">
          <span className="text-2xl">{selectedCountry?.flag}</span>
          <span className="text-white">{selectedCountry?.name}</span>
          <span className="text-gray-500">{selectedCountry?.code}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Send money home"
              className="w-full bg-[#393939] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Rate alert Value
            </label>
            <input
              type="number"
              value={targetRate}
              onChange={(e) => setTargetRate(e.target.value)}
              placeholder="₹ 1000"
              className="w-full bg-[#393939] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              step="0.01"
              min="0"
            />
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#81EBAB] hover:bg-green-500 text-black py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Setting alert..." : "Set alert"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-transparent hover:bg-[#393939] text-gray-400 hover:text-white py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RateAlertModal;
