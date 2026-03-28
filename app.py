from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "app.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    translation = db.Column(db.String(200), nullable=False)
    color = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Order {self.email}>"


@app.route("/")
def home():
    return "Flask backend is running"


@app.route("/api/order", methods=["POST"])
def create_order():
    data = request.get_json()

    email = data.get("email", "").strip()
    quantity = data.get("quantity")
    translation = data.get("translation", "").strip()
    color = data.get("color", "").strip()

    if not email or not quantity or not translation or not color:
        return jsonify({"message": "All fields are required"}), 400

    try:
        quantity = int(quantity)
    except ValueError:
        return jsonify({"message": "Quantity must be a valid number"}), 400

    new_order = Order(
        email=email,
        quantity=quantity,
        translation=translation,
        color=color
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({"message": "Bible has been purchased successfully"}), 201


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
