from pydantic import BaseModel
from typing import List

class OrderItem(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    total: float
    items: List[OrderItem]

class OrderOut(BaseModel):
    id: int
    customer_name: str
    email: str
    phone: str
    address: str
    total: float
    status: str
    class Config:
        from_attributes = True
