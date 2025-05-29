from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import sqlite3

app = FastAPI()
DATABASE = 'bookings.db'
SECRET_KEY = "your_secret_key"  # Change this to a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Initialize the password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Initialize the database
def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                hashed_password TEXT NOT NULL
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                event_type TEXT NOT NULL,
                event_date TEXT NOT NULL,
                guests INTEGER NOT NULL,
                special_requests TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL
            )
        ''')
        conn.commit()

init_db()

# Models
class User(BaseModel):
    username: str
    email: str
    password: str

class UserInDB(User):
    hashed_password: str

class Booking(BaseModel):
    name: str
    email: str
    phone: str
    event_type: str
    event_date: str
    guests: int
    special_requests: str = None

class Contact(BaseModel):
    name: str
    email: str
    message: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Helper functions
def create_hashed_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Authentication endpoints
@app.post("/signup/")
async def signup(user: User):
    hashed_password = create_hashed_password(user.password)
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO users (username, email, hashed_password)
                VALUES (?, ?, ?)
            ''', (user.username, user.email, hashed_password))
            conn.commit()
            return {"message": "User created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already registered")

@app.post("/token/", response_model=Token)
async def login(user: User):
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE username = ?', (user.username,))
            db_user = cursor.fetchone()
            if db_user is None or not verify_password(user.password, db_user[3]):
                raise HTTPException(status_code=401, detail="Invalid credentials")
            
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
            return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Booking endpoints
@app.post("/bookings/")
async def create_booking(booking: Booking):
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO bookings (name, email, phone, event_type, event_date, guests, special_requests)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (booking.name, booking.email, booking.phone, booking.event_type, booking.event_date, booking.guests, booking.special_requests))
            conn.commit()
            return {"id": cursor.lastrowid, "message": "Booking created successfully"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.get("/bookings/{booking_id}")
async def read_booking(booking_id: int):
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM bookings WHERE id = ?', (booking_id,))
            booking = cursor.fetchone()
            if booking:
                return {
                    "id": booking[0],
                    "name": booking[1],
                    "email": booking[2],
                    "phone": booking[3],
                    "event_type": booking[4],
                    "event_date": booking[5],
                    "guests": booking[6],
                    "special_requests": booking[7]
                }
            raise HTTPException(status_code=404, detail="Booking not found")
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.get("/bookings/")
async def list_bookings():
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM bookings')
            bookings = cursor.fetchall()
            return [
                {
                    "id": booking[0],
                    "name": booking[1],
                    "email": booking[2],
                    "phone": booking[3],
                    "event_type": booking[4],
                    "event_date": booking[5],
                    "guests": booking[6],
                    "special_requests": booking[7]
                }
                for booking in bookings
            ]
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# Contact endpoints
@app.post("/contacts/")
async def create_contact(contact: Contact):
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO contacts (name, email, message)
                VALUES (?, ?, ?)
            ''', (contact.name, contact.email, contact.message))
            conn.commit()
            return {"id": cursor.lastrowid, "message": "Contact message submitted successfully"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)