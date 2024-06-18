import React from "react";
import "../blocks/popup.css";
function PopupWithForm({ name, title, children, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_content_${name} ${
        isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <div className="popup__body">
          <h2 className="popup__title">{title}</h2>
          <form className="form" name={name}>
            {children}
            <button type="submit" className="form__submit" disabled>
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
