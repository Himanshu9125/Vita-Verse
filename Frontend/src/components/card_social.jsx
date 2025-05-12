import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { usePredictionContext } from "../context/predictionContext";

import Pop from "./pop";
const CardSocial = () => {
  const { predictions, newData, setNewData, addPrediction } =
    usePredictionContext();
  const [people, setPeople] = useState(0);
  const [category, setCategory] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered number: ${people}`);
    const newPrediction = {
      category: category,
      people: people,
      model_type: "knn",
    };
    console.log(newPrediction);
    setShowPopup(true);
    setNewData({
      category: category,
      people: people,
      model_type: "knn",
    });
    console.log(newData);

    addPrediction(newPrediction);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-white/40 to-blue-100/30 backdrop-blur-lg 
    border border-white/60 rounded-3xl shadow-2xl space-y-6 z-10 transition-transform hover:scale-[1.01]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 tracking-wide">
          Social Status
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
      focus:ring-blue-400 bg-white text-gray-700 shadow-inner hover:border-blue-400 transition-all duration-200"
        >
          <option value="0">Separated</option>
          <option value="1">Widowed/Widower</option>
          <option value="2">Married</option>
          <option value="3">Divorced</option>
          <option value="4">Never Married</option>
          <option value="5">Others</option>
        </select>

        <input
          type="number"
          id="numberInput"
          value={people}
          required
          onChange={(e) => setPeople(e.target.value)}
          placeholder="Enter the number of people"
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none 
      focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-inner placeholder-gray-400 
      hover:border-blue-400 transition-all duration-200"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 
      rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 
      flex items-center justify-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Send
          <FontAwesomeIcon icon={faSquareCaretRight} className="text-xl" />
        </button>
      </form>

      {/* <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-8 bg-white/40 backdrop-blur-md 
    border border-white/50 rounded-3xl shadow-xl space-y-6 z-10"
      >
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
          Social Status
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 
        focus:ring-blue-500 bg-white text-gray-800 shadow-inner"
        >
          <option value="0">Separated</option>
          <option value="1">Widowed/Widower</option>
          <option value="2">Married</option>
          <option value="3">Divorced</option>
          <option value="4">Never Married</option>
          <option value="5">Others</option>
        </select>

        <input
          type="number"
          id="numberInput"
          value={people}
          required
          onChange={(e) => setPeople(e.target.value)}
          placeholder="Enter the number of people"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-inner"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
        transition-all duration-200 flex items-center justify-center gap-3 text-lg font-medium shadow-lgd"
        >
          Send
          <FontAwesomeIcon icon={faSquareCaretRight} className="text-xl" />
        </button>
      </form> */}
      {showPopup && <Pop setShowPopup={setShowPopup} />}
    </div>
  );
};

export default CardSocial;
