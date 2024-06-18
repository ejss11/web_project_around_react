import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";
import "../blocks/content.css";

function AppMain({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  Cards,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <div
            className="profile__image"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <div className="profile__overlay">
            <span
              className="profile__edit-avatar"
              onClick={onEditAvatarClick}
            ></span>
          </div>
        </div>

        <div className="profile__heading">
          <div className="profile__heading-name">
            <h1 className="profile__heading-title">{userName}</h1>
            <button
              className="profile__heading-edit"
              onClick={onEditProfileClick}
            ></button>
          </div>

          <h2 className="profile__heading-subtitle">{userDescription}</h2>
        </div>
        <button
          className="profile__heading-add"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__public">
          {Cards.map((card) => (
            <Card key={card._id} cardData={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default AppMain;
