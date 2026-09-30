from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from app.database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(160), nullable=False)
    category = Column(String(80), nullable=False)
    texture = Column(String(80), nullable=False)
    length = Column(String(30), nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    stock = Column(Integer, default=0)
    featured = Column(Boolean, default=False)
