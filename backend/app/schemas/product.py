from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    category: str
    texture: str
    length: str
    price: float
    image: Optional[str] = None
    description: Optional[str] = None
    stock: int = 0
    featured: bool = False

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    class Config:
        from_attributes = True
