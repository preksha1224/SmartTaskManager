from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base
from app.enums.task_enums import TaskCategory


# ==========================
# User Model
# ==========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # One User -> Many Tasks
    tasks = relationship(
        "Task",
        back_populates="owner",
        cascade="all, delete-orphan"
    )


# ==========================
# Task Model
# ==========================
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    description = Column(String(500), nullable=True)

    status = Column(String(50), default="Pending")
    priority = Column(String(50), default="Medium")

    category = Column(
        Enum(TaskCategory),
        default=TaskCategory.OTHER,
        nullable=False
    )

    due_date = Column(
        DateTime(timezone=True),
        nullable=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    # Many Tasks -> One User
    owner = relationship(
        "User",
        back_populates="tasks"
    )