import React from "react";

function Navbar({ brand, links }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">
          {brand}
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
            {links.map((link) => (
              <NavItem key={link.id} href={`#${link.id}`} label={link.label} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, label }) {
  return (
    <li className="nav-item">
      <a className="nav-link active" href={href}>
        {label}
      </a>
    </li>
  );
}

function SectionWrapper({ children }) {
  return <div className="pt-5 mt-4">{children}</div>;
}

export { Navbar, NavItem, SectionWrapper };