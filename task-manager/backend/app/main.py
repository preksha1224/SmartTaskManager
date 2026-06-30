from fastapi import FastAPI

from app.database.database import Base, engine
from app.database import models
from app.routers import auth, tasks

# Create FastAPI application
app = FastAPI(
    title="Smart Task Manager API",
    description="REST API for managing tasks with JWT authentication.",
    version="1.0.0",
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Register API routers
app.include_router(auth.router)
app.include_router(tasks.router)


# Root Endpoint
@app.get("/", tags=["Home"])
def home():
    return {
        "message": "Welcome to Smart Task Manager API",
        "status": "Running",
        "version": "1.0.0"
    }