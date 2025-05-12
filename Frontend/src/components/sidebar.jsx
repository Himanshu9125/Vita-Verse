// // import React, { useEffect, useState } from "react";
// // import { usePredictionContext } from "../context/predictionContext";
// // // import axios from "axios";
// // const Sidebar = () => {
// //   const { predictions, addPrediction } = usePredictionContext();
// //   console.log(predictions);

// //   return (
// //     <ul className="text-gray-400 text-center">
// //       {Array.isArray(predictions) && predictions.length > 0 ? (
// //         predictions.map((item, index) => (
// //           <li key={index}>
// //             <div className="border-r-3 border-t-1 border-b-4 rounded-3xl border-gray-500 justify-center hover:">
// //               <h4>Category: {item.category}</h4>
// //               <h4>Number of people: {item.people}</h4>
// //             </div>
// //           </li>
// //         ))
// //       ) : (
// //         <h4>No Data yet</h4>
// //       )}
// //     </ul>
// //   );
// // };

// // export default Sidebar;
// import React from "react";
// import { usePredictionContext } from "../context/predictionContext";

// const Sidebar = () => {
//   const { predictions } = usePredictionContext();

//   return (
//     <div className="text-gray-300 p-4 h-full overflow-y-auto">
//       <h2 className="text-xl font-semibold text-white mb-6 text-center">Predictions</h2>

//       {Array.isArray(predictions) && predictions.length > 0 ? (
//         <ul className="space-y-4">
//           {predictions.map((item, index) => (
//             <li key={index}>
//               <div className="border border-gray-600 bg-gray-800/60 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
//                 <div className="flex justify-between mb-2">
//                   <h4 className="font-semibold text-blue-300 text-sm">Category:</h4>
//                   <p className="text-xs text-gray-200">{item.category}</p>
//                 </div>

//                 <div className="flex justify-between">
//                   <h4 className="font-semibold text-blue-300 text-sm">Number of people:</h4>
//                   <p className="text-xs text-gray-200">{item.people}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-sm text-gray-400">No Data yet</p>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React from "react";
// import { usePredictionContext } from "../context/predictionContext";

// const Sidebar = () => {
//   const { predictions } = usePredictionContext();

//   return (
//     <div className="text-gray-800 bg-gray-100 p-4 h-full overflow-y-auto border-r border-gray-200">
//       <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">Predictions</h2>

//       {Array.isArray(predictions) && predictions.length > 0 ? (
//         <ul className="space-y-4">
//           {predictions.map((item, index) => (
//             <li key={index}>
//               <div className="border border-gray-300 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
//                 <div className="flex justify-between mb-2">
//                   <h4 className="font-medium text-gray-600 text-sm">Category:</h4>
//                   <p className="text-sm text-gray-800">{item.category}</p>
//                 </div>

//                 <div className="flex justify-between">
//                   <h4 className="font-medium text-gray-600 text-sm">Number of people:</h4>
//                   <p className="text-sm text-gray-800">{item.people}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-sm text-gray-500">No data yet</p>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { usePredictionContext } from "../context/predictionContext";
import { Users, Tags } from "lucide-react"; // Modern icons

const Sidebar = () => {
  const { predictions } = usePredictionContext();

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 p-6 h-full overflow-y-auto border-r border-gray-200 shadow-inner">
      
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        📊 Predictions
      </h2>

      {Array.isArray(predictions) && predictions.length > 0 ? (
        <ul className="space-y-5">
          {predictions.map((item, index) => (
            <li key={index}>
              <div className="transition transform hover:scale-[1.02] hover:shadow-lg bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:border-blue-300">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tags className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Category</span>
                  </div>
                  <span className="text-gray-800 font-semibold text-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="font-medium">People</span>
                  </div>
                  <span className="text-gray-800 font-semibold">
                    {item.people}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400 mt-10 text-sm italic">
          No predictions yet. Try submitting a form!
        </p>
      )}
    </div>
  );
};

export default Sidebar;
