from app.database import Base, engine, SessionLocal
from app.models import User
from app.auth import hash_password

Base.metadata.create_all(bind=engine)

email = input("Admin email: ").strip().lower()
name = input("Admin name: ").strip()
password = input("Admin password (8+ characters): ")

if len(password) < 8:
    raise SystemExit("Password must be at least 8 characters.")

db = SessionLocal()
try:
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        existing.name = name
        existing.password_hash = hash_password(password)
        existing.role = "admin"
        existing.is_active = True
        print("Existing user promoted to admin.")
    else:
        db.add(User(
            name=name,
            email=email,
            password_hash=hash_password(password),
            role="admin",
            is_active=True,
        ))
        print("Admin account created.")
    db.commit()
finally:
    db.close()
