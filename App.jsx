import React, { useState } from "react";
import "./bootstrap.css";
import "./style.css";

import bibleImage from "./assets/360_F_77267297_X7ZlONu0i1biFeBVlJ8WAQugzGDZx83K.jpg";
import bibleImage2 from "./assets/download.jpg";
import bibleImage3 from "./assets/houdee.jpg";
import bibleImage4 from "./assets/king-james-version-bible-16187145.webp";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            MyBible.com
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" href="#menu">
                  Menu
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" href="#about">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" href="#order">
                  Order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="pt-5 mt-4">
          <Home />
        </div>

        <div className="pt-5 mt-4">
          <Menu />
        </div>

        <div className="pt-5 mt-4">
          <About />
        </div>

        <div className="pt-5 mt-4">
          <Order />
        </div>
      </main>
    </>
  );
}

function Home() {
  return (
    <section id="home" className="container">
      <div className="Home mx-auto text-center text-lg-start px-2 px-md-3">
        <div className="head">
          <h1 className="fs-4">
            Joshua 1 vs 8 says This Book of the Law shall not depart from your
            mouth, but you shall meditate on it day and night, so that you may
            be careful to do according to all that is written in it
          </h1>
        </div>

        <div className="images">
          <img
            className="img-fluid mt-3 w-100"
            src={bibleImage}
            alt="Bible verse illustration"
            title="Bible verse illustration"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Menu() {
  return (
    <section id="menu" className="container-2 container">
      <h1 className="text-center text-md-start">
        Here are some Bible translations we have
      </h1>

      <div className="row g-3 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="text-center">
            <img
              className="img-fluid mt-3 w-75"
              src={bibleImage2}
              alt="Good News Bible cover"
              title="Good News Bible cover"
              loading="lazy"
            />
            <div className="versions mt-2">
              <h2 className="h5">Good News Bible Translation</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="text-center">
            <img
              className="img-fluid mt-3 w-75"
              src={bibleImage3}
              alt="New Living Translation cover"
              title="New Living Translation cover"
              loading="lazy"
            />
            <div className="versions mt-2">
              <h2 className="h5">New Living Bible Translation</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="text-center">
            <img
              className="img-fluid mt-3 w-75"
              src={bibleImage4}
              alt="King James Version cover"
              title="King James Version cover"
              loading="lazy"
            />
            <div className="versions mt-2">
              <h2 className="h5">King James Bible Translation</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container-3 container">
      <h1 className="text-center text-md-start">
        Here at MyBible.com we make Bibles accessible to customers, reducing
        transportation costs.
      </h1>

      <h2 className="fs-6 mt-3 text-center text-md-start">
        At this website we aim to make sure every family in the world has a
        Bible.
      </h2>

      <ul className="mt-3">
        <li>
          Mission: To make Bibles accessible to customers while reducing
          transportation costs.
        </li>
        <li>Vision: To make sure every family in the world has a Bible.</li>
      </ul>
    </section>
  );
}

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    quantity: "",
    translation: "",
    color: "#000000",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const payload = {
      email: formData.email.trim(),
      quantity: Number(formData.quantity),
      translation: formData.translation.trim(),
      color: formData.color,
    };

    if (!payload.email || !payload.translation || !payload.quantity || !payload.color) {
      setMessage("All fields are required");
      setMessageType("danger");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Item has been purchased successfully");
        setMessageType("success");
        setFormData({
          email: "",
          quantity: "",
          translation: "",
          color: "#000000",
        });
      } else {
        setMessage(result.message || "Something went wrong");
        setMessageType("danger");
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      setMessage("Server connection failed. Make sure your Flask backend is running on http://127.0.0.1:5000");
      setMessageType("danger");
    }
  }

  return (
    <section id="order" className="container-4 container">
      <h1>Make your Order for the Bible you would like to buy</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <form className="p-2 p-md-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                required
                placeholder="Email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                required
                min="1"
                placeholder="How many Bibles would you like to buy"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                required
                placeholder="Bible Translation"
                className="form-control"
                name="translation"
                value={formData.translation}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="color"
                required
                className="form-control form-control-color w-100"
                name="color"
                value={formData.color}
                onChange={handleChange}
                title="Choose color"
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning border border-warning w-100"
            >
              Submit
            </button>

            {message && (
              <p
                className={`mt-3 fw-bold text-center ${
                  messageType === "success" ? "text-success" : "text-danger"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default App;