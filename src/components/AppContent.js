import React from "react";
import imageProfile from "../images/image_profile.jpg";
import "../blocks/content.css";

function AppContent() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={imageProfile}
            alt="imagen profile"
          />
          <div className="profile__overlay">
            <span className="profile__edit-avatar"></span>
          </div>
        </div>

        <div className="profile__heading">
          <div className="profile__heading-name">
            <h1 className="profile__heading-title"></h1>
            <button className="profile__heading-edit"></button>
          </div>

          <h2 className="profile__heading-subtitle">Explorador</h2>
        </div>
        <button className="profile__heading-add"></button>
      </section>
      <section className="cards">
        <ul className="cards__public"></ul>
      </section>
    </main>
  );
}

export default AppContent;
