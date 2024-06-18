import React from "react";

function Card({ cardData, onCardClick }) {
  const handleClick = () => {
    onCardClick(cardData);
  };

  return (
    <li className="card">
      <div className="card__image">
        <div
          className="card__image-photo"
          style={{ backgroundImage: `url(${cardData.link})` }}
          onClick={handleClick}
        ></div>
        <span className="card__image-delete"></span>
      </div>
      <div className="card__content">
        <h3 className="card__content-title">{cardData.name}</h3>
        <span className="card__content-like">
          <span className="card__counter">0</span>
        </span>
      </div>
    </li>
  );
}

export default Card;
