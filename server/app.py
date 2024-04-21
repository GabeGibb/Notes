from flask import Flask, request
from flask_cors import CORS
from db import db
from haversine import haversine, Unit

app = Flask(__name__)

# Allow CORS for all domains on all routes
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users')
def get_users():
    users = db.query("SELECT * FROM users;")
    return {"users": users}

@app.route('/users', methods=['POST'])
def create_user():
    username = request.json['username']
    existing_user = db.query("SELECT * FROM users WHERE username = %s;", (username,))
    if existing_user:
        return {"error": "Username is already taken"}, 400
    db.insert(
        "INSERT INTO users (username) VALUES (%s);",
        (username,)
    )
    return {"success": True}


@app.route('/notes')
def get_notes():
    notes = db.query("SELECT * FROM notes;")
    latitude = request.args.get('latitude', type=float)
    longitude = request.args.get('longitude', type=float)
    if latitude is None or longitude is None:
        return {"notes": notes}

    distance_limit = request.args.get('distance', type=float, default=1000000000)  # default distance limit is 500 feet
    notes_within_distance = []
    for note in notes:
        note_latitude = note['latitude']
        note_longitude = note['longitude']
        distance = haversine((latitude, longitude), (note_latitude, note_longitude), unit=Unit.FEET)
        if distance <= distance_limit:
            note['latitude_distance_feet'] = haversine((latitude, longitude), (note_latitude, longitude), unit=Unit.FEET) if note_latitude >= latitude else -haversine((latitude, longitude), (note_latitude, longitude), unit=Unit.FEET)
            note['longitude_distance_feet'] = haversine((latitude, longitude), (latitude, note_longitude), unit=Unit.FEET) if note_longitude >= longitude else -haversine((latitude, longitude), (latitude, note_longitude), unit=Unit.FEET)
            note['distance'] = distance
            notes_within_distance.append(note)
    return {"notes": notes_within_distance}

@app.route('/notes', methods=['POST'])
def create_note():
    content = request.json['content']
    latitude = request.json['latitude']
    longitude = request.json['longitude']
    user_id = request.json['user_id']
    db.insert(
        "INSERT INTO notes (user_id, content, latitude, longitude) VALUES (%s, %s, %s, %s);",
        (user_id, content, latitude, longitude)
    )
    return {"success": True}    

# @app.route('/delete_all')
# def delete_notes():
#     db.delete_all("notes")
#     db.delete_all("users")
#     return {"success": True}