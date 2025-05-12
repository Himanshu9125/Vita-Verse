import React, { createContext, useState, useContext } from "react";

// Create the context
const PredictionContext = createContext();

// Create a provider component
export const PredictionProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);
  const [newData, setNewData] = useState({
    category: -1,
    people: 0,
  });

  const addPrediction = (newPrediction) => {
    setPredictions((prev) => [...prev, newPrediction]);
  };

  const clearPredictions = () => {
    setPredictions([]);
  };

  return (
    <PredictionContext.Provider
      value={{
        predictions,
        newData,
        setNewData,
        addPrediction,
        clearPredictions,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

// Custom hook to use the PredictionContext
export const usePredictionContext = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error(
      "usePredictionContext must be used within a PredictionProvider"
    );
  }
  return context;
};
