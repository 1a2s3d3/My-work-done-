import React, { useState } from "react";
import { FormInput, ColorInput } from "./FormElements";

function Home({ verse, image }) {
  return (
    <section id="home" className="container">
      <div className="Home mx-auto text-center text-lg-start px-2 px-md-3">
        <div className="head">
          <h1 className="fs-4">{verse}</h1>
        </div>

        <div className="images">
          <img
            className="img-fluid mt-3 w-100"
            src={image}
            alt="Bible verse illustration"
            title="Bible verse illustration"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Menu({ title, items }) {
  return (
    <section id="menu" className="container-2 container">
      <h1 className="text-center text-md-start">{title}</h1>

      <div className="row g-3 justify-content-center">
        {items.map((item, index) => (
          <MenuCard
            key={index}
            image={item.image}
            alt={item.alt}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
}

function MenuCard({ image, alt, title }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="text-center">
        <img
          className="img-fluid mt-3 w-75"
          src={image}
          alt={alt}
          title={alt}
          loading="lazy"
        />
        <div className="versions mt-2">
          <h2 className="h5">{title}</h2>
        </div>
      </div>
    </div>
  );
}

function About({ heading, subheading, mission, vision }) {
  return (
    <section id="about" className="container-3 container">
      <h1 className="text-center text-md-start">{heading}</h1>

      <h2 className="fs-6 mt-3 text-center text-md-start">{subheading}</h2>

      <ul className="mt-3">
        <li>Mission: {mission}</li>
        <li>Vision: {vision}</li>
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

    if (
      !payload.email ||
      !payload.quantity ||
      !payload.translation ||
      !payload.color
    ) {
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
        setMessage(
          result.message || "Bible has been purchased successfully"
        );
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
      console.error("Fetch error:", error);
      setMessage(
        "Server connection failed. Make sure your Flask backend is running."
      );
      setMessageType("danger");
    }
  }

  return (
    <section id="order" className="container-4 container">
      <h1>Make your Order for the Bible you would like to buy</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <form className="p-2 p-md-3" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <FormInput
              type="number"
              name="quantity"
              min="1"
              placeholder="How many Bibles would you like to buy"
              value={formData.quantity}
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="translation"
              placeholder="Bible Translation"
              value={formData.translation}
              onChange={handleChange}
            />

            <ColorInput
              label="Color of bible"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />

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

export { Home, Menu, MenuCard, About, Order };