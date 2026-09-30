from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models import Product, Order, User
from app.api.products import router as products_router
from app.api.orders import router as orders_router
from app.api.auth import router as auth_router
from app.api.admin import router as admin_router

Base.metadata.create_all(bind=engine)
app=FastAPI(title="LuxeStrand Hair API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(products_router,prefix="/api")
app.include_router(orders_router,prefix="/api")
app.include_router(auth_router,prefix="/api")

@app.get("/")
def root(): return {"message":"LuxeStrand Hair API is running"}
