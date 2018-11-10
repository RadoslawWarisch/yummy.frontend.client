import { loginFormReducer } from "./login-form/login-form.reducer";
import { _routeReducer } from "./_route/_route.reducer";
import { _toastReducer } from "./_toast/_toast.reducer";
import { _loaderReducer } from "./_loader/_loader.reducer";
import { _modalReducer } from "./_modal/_modal.reducer";
import { geolocationReducer } from "./geolocation/geolocation.reducer";
import { placeReducer } from "./place/place.reducer";
import { userReducer } from "./user/user.reducer";
import { offerReducer } from "./offer/offer.reducer";
import { bucketReducer } from "./bucket/bucket.reducer";
import { transactionReducer } from "./transaction/transaction.reducer";
import { _alertReducer } from "./_alert/_alert.reducer";

export const Reducers = {
  _alert: _alertReducer,
  _route: _routeReducer,
  _toast: _toastReducer,
  _loader: _loaderReducer,
  _modal: _modalReducer,
  loginForm: loginFormReducer,
  geolocation: geolocationReducer,
  place: placeReducer,
  user: userReducer,
  offer: offerReducer,
  bucket: bucketReducer,
  transaction: transactionReducer
}