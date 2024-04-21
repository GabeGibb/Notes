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
    user_id = db.query("SELECT id FROM users WHERE username = %s;", (username,))[0]['id']
    return {"success": True, "user_id": user_id}

@app.route('/users/<int:user_id>')
def get_user(user_id):
    user = db.query("SELECT * FROM notes WHERE user_id = %s;", (user_id,))
    return {"messages": user}

@app.route('/notes/<int:id>')
def get_note(id):
    notes = db.query("SELECT * FROM notes WHERE id = %s;", (id,))
    for note in notes:
        user = db.query("SELECT * FROM users WHERE id = %s;", (note['user_id'],))
        note['user'] = user[0] if user else None
    return {"message": notes[0]}

@app.route('/notes')
def get_notes():
    notes = db.query("SELECT * FROM notes;")
    for note in notes:
        user = db.query("SELECT * FROM users WHERE id = %s;", (note['user_id'],))
        note['user'] = user[0] if user else None
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
    # Sort the notes by distance
    notes_within_distance.sort(key=lambda note: note['distance'])
    # Get the 10 closest notes
    notes_within_distance = notes_within_distance[:10]
    return {"notes": notes_within_distance}

@app.route('/notes', methods=['POST'])
def create_note():
    content = request.json['content']
    latitude = request.json['latitude']
    longitude = request.json['longitude']
    user_id = request.json['user_id']
    imgname = request.json['imgname']
    db.insert(
        "INSERT INTO notes (user_id, imgname, content, latitude, longitude) VALUES (%s, %s, %s, %s, %s);",
        (user_id, imgname, content, latitude, longitude)
    )
    return {"success": True}    

# @app.route('/delete_all')
# def delete_notes():
#     db.delete_all("notes")
#     db.delete_all("users")
#     return {"success": True}