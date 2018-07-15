import { loginFormReducer } from "./login-form/login-form.reducer";
import { _routeReducer } from "./_route/_route.reducer";
import { _toastReducer } from "./_toast/_toast.reducer";
import { _loaderReducer } from "./_loader/_loader.reducer";
import { _modalReducer } from "./_modal/_modal.reducer";
import { geolocationReducer } from "./geolocation/geolocation.reducer";
import { placeReducer } from "./place/place.reducer";
import { userReducer } from "./user/user.reducer";

export const Reducers = {
  _route: _routeReducer,
  _toast: _toastReducer,
  _loader: _loaderReducer,
  _modal: _modalReducer,
  loginForm: loginFormReducer,
  geolocation: geolocationReducer,
  place: placeReducer,
  user: userReducer
}