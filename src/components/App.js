import React, { useState, useEffect } from "react";
import "../styles/index.css";
import AppHeader from "./AppHeader";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/api";
import Card from "./Card";
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
  const [isLoading, setIsLoanding] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoanding(true);
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
        setIsLoanding(false);
      });
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleConfirmDelete() {
    if (cardToDelete) {
      setIsLoanding(true);
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
          setIsLoanding(false);
        });
    }
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoanding(true);
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
        setIsLoanding(false);
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
      .catch((err) => console.log(err));
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

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
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
        >
          <ul className="cards__public">
            {cards.map((card) => (
              <Card
                key={card._id}
                cardData={card}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ))}
          </ul>
        </Main>
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
