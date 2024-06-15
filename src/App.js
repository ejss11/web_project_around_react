import "./index.css";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <>
      <AppHeader />
      <AppContent />
      <AppFooter />
      <div class="popup popup_content_profile">
        <div class="popup__overlay"></div>
        <div class="popup__content">
          <button type="button" class="popup__close-btn"></button>
          <div class="popup__body">
            <h2 class="popup__title">Editar Perfil</h2>
            <form class="form">
              <input
                type="text"
                name="name"
                class="form__input"
                placeholder="Nombre"
                minlength="2"
                maxlength="40"
                required
              />
              <span class="form__input-error form__input-error_type_name"></span>
              <br />
              <input
                type="text"
                name="about"
                class="form__input"
                placeholder="Acerca de mí"
                minlength="2"
                maxlength="200"
                required
              />
              <span class="form__input-error form__input-error_type_about"></span>
              <br />
              <button type="submit" class="form__submit" disabled>
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="popup popup_content_add-card">
        <div class="popup__overlay"></div>
        <div class="popup__content">
          <button type="button" class="popup__close-btn"></button>
          <div class="popup__body">
            <h2 class="popup__title">Nuevo Lugar</h2>
            <form class="form">
              <input
                type="text"
                name="title"
                class="form__input"
                placeholder="Titulo"
                minlength="2"
                maxlength="30"
                required
              />
              <span class="form__input-error form__input-error_type_title"></span>
              <br />
              <input
                type="url"
                name="link"
                class="form__input"
                placeholder="Enlace de la imagen"
                required
                minlength="2"
              />
              <span class="form__input-error form__input-error_type_link"></span>
              <br />
              <button type="submit" class="form__submit" disabled>
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="popup popup_content_profile-image">
        <div class="popup__overlay"></div>
        <div class="popup__content">
          <button type="button" class="popup__close-btn"></button>
          <div class="popup__body">
            <h2 class="popup__title">Cambiar foto de perfil</h2>
            <form class="form">
              <br />
              <input
                type="url"
                name="url"
                class="form__input"
                placeholder="Enlace de la imagen de perfil"
                required
                minlength="2"
              />
              <span class="form__input-error form__input-error_type_url"></span>
              <br />
              <button type="submit" class="form__submit" disabled>
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="popup popup_content_delete-card">
        <div class="popup__overlay"></div>
        <div class="popup__content">
          <button type="button" class="popup__close-btn"></button>
          <div class="popup__body">
            <h2 class="popup__title">¿Estás seguro?</h2>
            <form class="form">
              <br />
              <button type="button" class="form__submit" id="confirm-delete">
                Si
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="popup popup_image">
        <div class="popup__overlay"></div>
        <div class="popup__content">
          <button type="button" class="popup__close-btn"></button>
          <img class="popup__image" src="ruta" alt="imagen popup" />
          <p class="popup__image-title"></p>
        </div>
      </div>
      <template class="template">
        <li class="card">
          <div class="card__image">
            <img src="ruta" alt="imagen template" class="card__image-photo" />
            <span class="card__image-delete"></span>
          </div>
          <div class="card__content">
            <h3 class="card__content-title"></h3>
            <span class="card__content-like">
              <span class="card__counter">0</span>
            </span>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
