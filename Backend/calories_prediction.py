# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn
# from pydantic import BaseModel
# import pandas as pd
# import joblib
# import logging

# # Set up logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Load both models
# try:
#     calorie_model = joblib.load('caloriepredictor_model.pkl')
#     logger.info("Models loaded successfully")
# except Exception as e:
#     logger.error(f"Error loading models: {e}")
#     raise

# app = FastAPI(title="Calorie Prediction API")

# # Allow frontend connection
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Define request body
# class InputData(BaseModel):
#     Gender:int
#     Age:int
#     Height:int
#     Weight:int
#     Duration :int
#     Heart_Rate:int
#     Body_Temp:int 
    
#     class Config:
#         schema_extra = {
#             "example": {
#                 "Category": 1,
#                 "Total": 100,
#                 "model_type": "bagging"
#             }
#         }

# @app.post("/calorie/predict")
# def model_prediction(data: InputData):
#     """
#     Predicts gender based on Category and Total using the specified model.
#     Returns 'Male' (0) or 'Female' (1).
#     """
#     # Prepare input
#     input_df = pd.DataFrame({
#         "Gender": [data.Gender],
#         "Age": [data.Age],
#         "Height": [data.Height],
#         "Weight": [data.Weight],
#         "Duration": [data.Duration],
#         "Heart_Rate": [data.Heart_Rate],
#         "Body_Temp": [data.Body_Temp]
        
#     })
    
#     logger.info(f"Making prediction with {data.model_type} model on input: {input_df.to_dict()}")
    
#     # Choose model based on input
#     try:
       
#             result = calorie_model.predict(input_df)[0]
        
#     except Exception as e:
#         logger.error(f"Prediction error: {e}")
#         raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

#     prediction = result
#     logger.info(f"Prediction result: {prediction}")
    
#     return {"prediction": prediction}

# @app.get("/health")
# def health_check():
#     """Health check endpoint to verify API is running."""
#     return {"status": "healthy"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=9000)
    