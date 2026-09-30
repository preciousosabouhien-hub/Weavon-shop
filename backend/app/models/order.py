from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from datetime import datetime
from app.database import Base

class Order(Base):
    __tablename__="orders"
    id=Column(Integer,primary_key=True,index=True)
    customer_name=Column(String(160),nullable=False)
    email=Column(String(200),nullable=False)
    phone=Column(String(50),nullable=False)
    address=Column(Text,nullable=False)
    total=Column(Float,nullable=False)
    status=Column(String(40),default="pending")
    user_id=Column(Integer,ForeignKey("users.id"),nullable=True,index=True)
    created_at=Column(DateTime,default=datetime.utcnow)
