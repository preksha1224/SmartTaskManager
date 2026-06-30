from enum import Enum


class TaskCategory(str, Enum):
    WORK = "Work"
    PERSONAL = "Personal"
    STUDY = "Study"
    SHOPPING = "Shopping"
    FINANCE = "Finance"
    HEALTH = "Health"
    TRAVEL = "Travel"
    OTHER = "Other"