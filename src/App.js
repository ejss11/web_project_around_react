import React, { useState, useEffect } from "react";
import "./index.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithImage from "./components/PopupWithImage";
import AppMain from "./components/AppMain";
import api from "./utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagenPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleDeletePlaceClick = () => {
    setIsConfirmDeletePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagenPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagenPopupOpen(true);
  };

  return (
    <>
      <AppHeader />
      <AppMain
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onDeletePlaceClick={handleDeletePlaceClick}
        onCardClick={handleCardClick} // Pasar handleCardClick al componente Main
        Cards={cards} // Pasar el array de cards al componente Main
      />
      <AppFooter />
      {/*Popup Profile */}
      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          className="form__input"
          placeholder="Nombre"
          minlength="2"
          maxlength="40"
          required
        />
        <span className="form__input-error form__input-error_type_name"></span>
        <br />
        <input
          type="text"
          name="about"
          className="form__input"
          placeholder="Acerca de mí"
          minlength="2"
          maxlength="200"
          required
        />
        <span className="form__input-error form__input-error_type_about"></span>
        <br />
      </PopupWithForm>
      {/*Popup Add Card */}
      <PopupWithForm
        name="add-card"
        title="Nuevo Lugar"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="title"
          className="form__input"
          placeholder="Titulo"
          minlength="2"
          maxlength="30"
          required
        />
        <span className="form__input-error form__input-error_type_title">
          {}
        </span>
        <br />
        <input
          type="url"
          name="link"
          className="form__input"
          placeholder="Enlace de la imagen"
          minlength="2"
          required
        />
        <span className="form__input-error form__input-error_type_link"></span>
        <br />
      </PopupWithForm>
      {/*Popup Edit Avatar */}
      <PopupWithForm
        name="profile-image"
        title="Cambiar foto de perfil"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          name="url"
          className="form__input"
          placeholder="Enlace de la imagen de perfil"
          minlength="2"
          required
        />
        <span className="form__input-error form__input-error_type_url"></span>
        <br />
      </PopupWithForm>
      {/*Popup Confirm Delete Card */}
      <PopupWithForm
        name="delete-card"
        title="¿Estás seguro?"
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
      >
        <button type="button" className="form__submit" id="confirm-delete">
          Si
        </button>
      </PopupWithForm>
      {/*Popup Open Image */}
      {selectedCard && (
        <PopupWithImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></PopupWithImage>
      )}
      <template className="template">
        <li className="card">
          <div className="card__image">
            <img
              src={"ruta"}
              alt="imagen template"
              className="card__image-photo"
            />
            <span className="card__image-delete"></span>
          </div>
          <div className="card__content">
            <h3 className="card__content-title">{""}</h3>
            <span className="card__content-like">
              <span className="card__counter">0</span>
            </span>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
