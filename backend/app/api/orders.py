from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderOut
from app.auth import get_current_user

router=APIRouter(prefix="/orders",tags=["orders"])

@router.get("",response_model=list[OrderOut])
def list_orders(db:Session=Depends(get_db),user=Depends(get_current_user)):
    return db.query(Order).filter(Order.user_id==user.id).order_by(Order.id.desc()).all()

@router.post("",response_model=OrderOut)
def create_order(payload:OrderCreate,db:Session=Depends(get_db),user=Depends(get_current_user)):
    order=Order(customer_name=payload.customer_name,email=payload.email,phone=payload.phone,address=payload.address,total=payload.total,user_id=user.id)
    db.add(order); db.commit(); db.refresh(order)
    return order

@router.get("/mine",response_model=list[OrderOut])
def my_orders(db:Session=Depends(get_db),user=Depends(get_current_user)):
    return db.query(Order).filter(Order.user_id==user.id).order_by(Order.id.desc()).all()
