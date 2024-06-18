import { token, groupId, baseUrl } from "../utils/constants";

class Api {
  constructor({ address, groupId, token }) {
    this._address = address;
    this._groupId = groupId;
    this._token = token;
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._address}${this._groupId}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._address}${this._groupId}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editProfile(userData) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(userData),
    }).then(this._checkResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: cardData.title,
        link: cardData.link,
      }),
    }).then(this._checkResponse);
  }

  async deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  updateAvatar(userData) {
    return fetch(`${this._address}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: userData }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  address: baseUrl,
  groupId: groupId,
  token: token,
});

export default api;
