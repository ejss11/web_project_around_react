import React, { useContext } from "react";

import "../blocks/content.css";
import "../blocks/profile.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  children,
}) {
  const currentUser = useContext(CurrentUserContext);

  /*
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  } */

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            className="profile__image"
            alt={`Perfil : ${currentUser.name}`}
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
            <h1 className="profile__heading-title">{currentUser.name}</h1>
            <button
              className="profile__heading-edit"
              onClick={onEditProfileClick}
            ></button>
          </div>

          <h2 className="profile__heading-subtitle">{currentUser.about}</h2>
        </div>
        <button
          className="profile__heading-add"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="cards">{children}</section>
    </main>
  );
}

export default Main;
