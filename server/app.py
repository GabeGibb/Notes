from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for all domains on all routes
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Hello, World!'

