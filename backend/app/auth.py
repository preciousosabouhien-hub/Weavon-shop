import os
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User

SECRET_KEY=os.getenv("JWT_SECRET_KEY","CHANGE_THIS_IN_PRODUCTION")
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=1440
pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def hash_password(password:str)->str: return pwd_context.hash(password)
def verify_password(password:str,hashed:str)->bool: return pwd_context.verify(password,hashed)
def create_access_token(user_id:int)->str:
    expire=datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub":str(user_id),"exp":expire},SECRET_KEY,algorithm=ALGORITHM)

def get_current_user(token:str=Depends(oauth2_scheme),db:Session=Depends(get_db)):
    error=HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid or expired authentication token",headers={"WWW-Authenticate":"Bearer"})
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        user_id=int(payload.get("sub"))
    except (JWTError,TypeError,ValueError):
        raise error
    user=db.get(User,user_id)
    if not user or not user.is_active: raise error
    return user

def require_admin(user=Depends(get_current_user)):
    if user.role!="admin": raise HTTPException(status_code=403,detail="Admin access required")
    return user
