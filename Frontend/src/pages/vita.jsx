import React, { useState, useEffect, useRef, effect } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min.js";
import Sidebar from "../components/sidebar";
import CardEducation from "../components/card_education";
import CardSocial from "../components/card_social";
import { usePredictionContext } from "../context/predictionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Vita() {
  const { predictions, newData, setNewData, addPrediction } =
    usePredictionContext();
  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setHistory((prev) => ({ ...prev, [name]: value }));

  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setShowPopup(true);
  };
  const [flag, setFlag] = useState(0);

  const vantaRef = useRef(null);
  console.log(predictions);
  useEffect(() => {
    const sendPrediction = async () => {
      if (newData.category != -1 || !newData.people) {
        console.error("Missing category or people data!");
        return; // Do not proceed if essential data is missing
      }

      try {
        const payload = { category: newData.category, people: newData.people };
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/search-history`,
          payload
        );

        console.log("Prediction saved successfully");
      } catch (error) {
        console.error("Error saving prediction:", error);
      }
    };

    sendPrediction();
  }, [newData]);

  useEffect(() => {
    FOG({
      el: vantaRef.current,
      THREE,
      color: 0x87ceeb, // Sky blue
      highlightColor: 0xffffff, // White
      midtoneColor: 0xadd8e6, // Light sky blue (optional)
      lowlightColor: 0xd3f1ff, // Soft pastel blue (optional)
      baseColor: 0xeaf6ff, // Background fog tint
      backgroundColor: 0xf0f8ff, // Almost white with a hint of blue
      blurFactor: 0.7,
      speed: 1.2,
      zoom: 1.0,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    // <div className=" flex flex-col h-screen w-full bg-gray-600">
    //   <div ref={vantaRef} className=" top-0 left-0 h-full w-full">
    //     <div
    //       onSubmit={handleSubmit}
    //       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    //            max-w-md w-full p-6 bg-gradient-to-br from-blue-400/20 to-blue-100/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 md:ml-30"
    //     >
    //       {/* <div
    //         className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 via-emerald-300 to-sky-400
    //                  animate-borderPulse rounded-xl blur-sm -z-9"
    //       ></div> */}
    //       <div className="relative z-10">
    //         <div className="flex flex-col">
    //           <div className="flex flex-row justify-center items-center gap-5">
    //             <div className="flex justify-center gap-5 mb-4">
    //               <button
    //                 type="button"
    //                 className={`px-4 py-2 border rounded-lg ${
    //                   flag === 0
    //                     ? "bg-blue-500 text-white"
    //                     : "bg-white text-blue-500"
    //                 }`}
    //                 onClick={() => setFlag(1)}
    //               >
    //                 Education Status
    //               </button>
    //               <button
    //                 type="button"
    //                 className={`px-4 py-2 border rounded-lg ${
    //                   flag === 1
    //                     ? "bg-blue-500 text-white"
    //                     : "bg-white text-blue-500"
    //                 }`}
    //                 onClick={() => setFlag(0)}
    //               >
    //                 Social Status
    //               </button>
    //             </div>
    //           </div>
    //           {flag ? <CardEducation /> : <CardSocial />}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="absolute h-full w-[22%] bg-gray-800  rounded-r p-1 justify-center items-center">
    //     <Sidebar className="w-[90%] " />
    //   </div>
    // </div>
    <div className="flex flex-col h-screen w-full relative overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 md:ml-[23%] md:mt-1.5  hover:text-gray-800 text-gray-500 rounded-4xl border-2 shadow"
        >
          ←
        </button>
        <div
          onSubmit={handleSubmit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-full max-w-md p-8 bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 z-20 ml-[10%]"
        >
          <div className="relative z-10 space-y-6">
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold shadow-md ${
                  flag === 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setFlag(1)}
              >
                Education Status
              </button>
              <button
                type="button"
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold shadow-md ${
                  flag === 0
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setFlag(0)}
              >
                Social Status
              </button>
            </div>
            <div className="pt-2">
              {flag ? <CardEducation /> : <CardSocial />}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 h-full w-[22%] bg-gray-900/90 backdrop-blur-md shadow-lg border-r border-white/10 z-30">
        <Sidebar className="w-full h-full p-4" />
      </div>
    </div>
  );
}
