import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePredictionContext } from "../context/predictionContext";

const Pop = ({ setShowPopup }) => {
  const { newData } = usePredictionContext();
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendPrediction = async () => {
      if (newData.category === -1 || !newData.people) {
        setError("Missing category or people data!");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const payload = {
          Category: parseInt(newData.category),
          Total: parseInt(newData.people),
          model_type: newData.model_type, // Default to bagging if not specified
        };
        console.log(payload);

        const response = await axios.post(
          "http://127.0.0.1:8000/predict",
          payload
        );

        setGender(response.data.prediction);
        setLoading(false);
      } catch (error) {
        console.error("Error making prediction:", error);
        setError(error.response?.data?.detail || "Failed to get prediction");
        setLoading(false);
      }
    };

    sendPrediction();
  }, [newData]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-80">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Prediction Result</h3>

        {loading && (
          <div className="flex justify-center py-6">
            <div className="w-10 h-10 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-3 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Predicted Gender:</p>
              <h1 className="text-3xl font-bold text-blue-700">{gender}</h1>
            </div>

            <div className="text-left bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Prediction details:
              </p>
              <ul className="text-xs text-gray-600 mt-1 space-y-1">
                <li>• Category: {newData.category}</li>
                <li>• Total people: {newData.people}</li>
                <li>• Model used: {newData.model_type || "bagging"}</li>
              </ul>
            </div>
          </>
        )}

        <button
          onClick={closePopup}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Pop;
