from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import pandas as pd
import joblib
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load both models
try:
    bagging_model = joblib.load('bagging_model.pkl')
    knn_model = joblib.load('knn_model.pkl')
    logger.info("Models loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {e}")
    raise

app = FastAPI(title="Gender Prediction API")

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body
class InputData(BaseModel):
    Category: int
    Total: int
    model_type: str  # 'bagging' or 'knn'
    
    class Config:
        schema_extra = {
            "example": {
                "Category": 1,
                "Total": 100,
                "model_type": "bagging"
            }
        }

@app.post("/predict")
def model_prediction(data: InputData):
    """
    Predicts gender based on Category and Total using the specified model.
    Returns 'Male' (0) or 'Female' (1).
    """
    # Prepare input
    input_df = pd.DataFrame({
        "Category": [data.Category],
        "Total": [data.Total]
    })
    
    logger.info(f"Making prediction with {data.model_type} model on input: {input_df.to_dict()}")
    
    # Choose model based on input
    try:
        if data.model_type.lower() == "bagging":
            result = bagging_model.predict(input_df)[0]
        elif data.model_type.lower() == "knn":
            result = knn_model.predict(input_df)[0]
        else:
            raise HTTPException(
                status_code=400, 
                detail="Invalid model_type. Choose 'bagging' or 'knn'."
            )
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

    prediction = "Male" if result == 0 else "Female"
    logger.info(f"Prediction result: {prediction}")
    
    return {"prediction": prediction}

@app.get("/health")
def health_check():
    """Health check endpoint to verify API is running."""
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    