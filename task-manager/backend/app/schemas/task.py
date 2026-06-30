from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.enums.task_enums import TaskCategory


# ==========================
# Create Task Schema
# ==========================
class TaskCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: Optional[str] = Field(None, max_length=500)
    priority: Optional[str] = "Medium"
    category: TaskCategory = TaskCategory.OTHER
    due_date: Optional[datetime] = None


# ==========================
# Update Task Schema
# ==========================
class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    description: Optional[str] = Field(None, max_length=500)
    status: Optional[str] = None
    priority: Optional[str] = None
    category: Optional[TaskCategory] = None
    due_date: Optional[datetime] = None


# ==========================
# Response Schema
# ==========================
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    priority: str
    category: TaskCategory
    due_date: Optional[datetime]
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True