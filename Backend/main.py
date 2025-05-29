from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sqlite3
import uuid

app = FastAPI()

# Database setup
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Models
class Contact(BaseModel):
    index: str
    name: str
    email: str
    message: str

class Booking(BaseModel):
    index: str
    name: str
    email: str
    phone: str
    event_type: str
    event_date: str
    guests: int
    special_requests: str

# Create tables
with get_db_connection() as conn:
    conn.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            index TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            message TEXT
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            index TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            event_type TEXT,
            event_date TEXT,
            guests INTEGER,
            special_requests TEXT
        )
    ''')

# Endpoints
@app.post("/contacts/", response_model=Contact)
async def create_contact(contact: Contact):
    contact.index = str(uuid.uuid4())  # Generate a unique index
    with get_db_connection() as conn:
        conn.execute('INSERT INTO contacts (index, name, email, message) VALUES (?, ?, ?, ?)',
                     (contact.index, contact.name, contact.email, contact.message))
        return contact

@app.post("/bookings/", response_model=Booking)
async def create_booking(booking: Booking):
    booking.index = str(uuid.uuid4())  # Generate a unique index
    with get_db_connection() as conn:
        conn.execute('INSERT INTO bookings (index, name, email, phone, event_type, event_date, guests, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                     (booking.index, booking.name, booking.email, booking.phone, booking.event_type, booking.event_date, booking.guests, booking.special_requests))
        return booking

@app.get("/contacts/", response_model=List[Contact])
async def get_contacts():
    with get_db_connection() as conn:
        contacts = conn.execute('SELECT * FROM contacts').fetchall()
        return [dict(contact) for contact in contacts]

@app.get("/bookings/", response_model=List[Booking])
async def get_bookings():
    with get_db_connection() as conn:
        bookings = conn.execute('SELECT * FROM bookings').fetchall()
        return [dict(booking) for booking in bookings]