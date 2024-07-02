import React, { useState, useEffect } from "react";
import "../index.css";
import AppHeader from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagenPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userInfo]) => {
        setCards(cardsData);
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.error(`Error : ${err}`);
      });
  }, []);

  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error Editar info Perfil: ${err}`));
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api
      .updateAvatar(avatarLink)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Error Updating avatar: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleConfirmDelete() {
    if (cardToDelete) {
      setIsLoading(true);
      api
        .deleteCard(cardToDelete._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
          closeAllPopups();
        })
        .catch((err) => {
          console.error(`Error Eliminar card: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Error Agregar Nueva card: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Error Like card: ${err}`));
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagenPopupOpen(false);
    setCardToDelete(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagenPopupOpen(true);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <AppHeader />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
          onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
          onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
        ></Main>
        <Footer />
        {/*Popup Profile */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        {/*Popup Add Card */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        {/*Popup Edit Avatar */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        {/*Popup Confirm Delete Card */}
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDelete}
          isLoading={isLoading}
        />
        {/*Popup Open Image */}
        {selectedCard && (
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          ></ImagePopup>
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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
