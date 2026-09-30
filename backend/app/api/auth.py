from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, Token, UserOut
from app.auth import hash_password, verify_password, create_access_token, get_current_user

router=APIRouter(prefix="/auth",tags=["authentication"])

@router.post("/register",response_model=Token)
def register(payload:RegisterRequest,db:Session=Depends(get_db)):
    email=payload.email.lower()
    if db.query(User).filter(User.email==email).first():
        raise HTTPException(400,"An account with this email already exists")
    if len(payload.password)<8: raise HTTPException(400,"Password must be at least 8 characters")
    user=User(name=payload.name.strip(),email=email,phone=payload.phone,password_hash=hash_password(payload.password),role="customer")
    db.add(user); db.commit(); db.refresh(user)
    return {"access_token":create_access_token(user.id),"token_type":"bearer","user":user}

@router.post("/login",response_model=Token)
def login(payload:LoginRequest,db:Session=Depends(get_db)):
    user=db.query(User).filter(User.email==payload.email.lower()).first()
    if not user or not verify_password(payload.password,user.password_hash):
        raise HTTPException(401,"Incorrect email or password")
    return {"access_token":create_access_token(user.id),"token_type":"bearer","user":user}

@router.get("/me",response_model=UserOut)
def me(user=Depends(get_current_user)): return user
