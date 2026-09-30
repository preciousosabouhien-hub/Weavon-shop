from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.models.order import Order
from app.models.user import User
from app.schemas.product import ProductCreate, ProductOut
from app.schemas.order import OrderOut
from app.schemas.auth import UserOut
from app.auth import require_admin

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/me", response_model=UserOut)
def admin_me(admin=Depends(require_admin)):
    return admin

@router.get("/products", response_model=list[ProductOut])
def admin_products(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(Product).order_by(Product.id.desc()).all()

@router.post("/products", response_model=ProductOut)
def admin_create_product(payload: ProductCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    item = Product(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/products/{product_id}")
def admin_delete_product(product_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    item = db.get(Product, product_id)
    if not item:
        raise HTTPException(404, "Product not found")
    db.delete(item)
    db.commit()
    return {"message": "Product deleted"}

@router.get("/orders", response_model=list[OrderOut])
def admin_orders(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(Order).order_by(Order.id.desc()).all()

@router.patch("/orders/{order_id}/status")
def admin_update_order_status(order_id: int, status: str, db: Session = Depends(get_db), admin=Depends(require_admin)):
    allowed = {"pending", "paid", "processing", "shipped", "delivered", "cancelled"}
    if status not in allowed:
        raise HTTPException(400, "Invalid order status")
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    order.status = status
    db.commit()
    return {"message": "Order status updated", "status": status}

@router.get("/customers", response_model=list[UserOut])
def admin_customers(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(User).order_by(User.id.desc()).all()
