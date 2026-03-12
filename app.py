from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

# Allow requests from frontend
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "app.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    translation = db.Column(db.String(200), nullable=False)
    color = db.Column(db.String(20), nullable=False)


@app.route("/", methods=["GET"])
def home():
    return "Flask server is running"


@app.route("/api/order", methods=["POST"])
def create_order():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({"message": "No data received"}), 400

        email = str(data.get("email", "")).strip()
        translation = str(data.get("translation", "")).strip()
        color = str(data.get("color", "")).strip()
        quantity = data.get("quantity")

        if not email or not translation or not color or quantity is None:
            return jsonify({"message": "All fields are required"}), 400

        try:
            quantity = int(quantity)
        except (ValueError, TypeError):
            return jsonify({"message": "Quantity must be a number"}), 400

        if quantity < 1:
            return jsonify({"message": "Quantity must be at least 1"}), 400

        new_order = Order(
            email=email,
            quantity=quantity,
            translation=translation,
            color=color
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "Item has been purchased successfully"}), 201

    except Exception as e:
        print("BACKEND ERROR:", e)
        return jsonify({"message": "Server error"}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(host="127.0.0.1", port=5000, debug=True)