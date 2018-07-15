import { _RouteState } from "./reducers/_route/_route.reducer";
import { _LoaderState } from "./reducers/_loader/_loader.reducer";
import { _ToastState } from "./reducers/_toast/_toast.reducer";
import { _ModalState } from "./reducers/_modal/_modal.reducer";
import { LoginFormState } from "./reducers/login-form/login-form.reducer";
import { GeolocationState } from "./reducers/geolocation/geolocation.reducer";
import { PlaceState } from "./reducers/place/place.reducer";
import { UserState } from "./reducers/user/user.reducer";

export interface AppState {
  _route: _RouteState,
  _loader: _LoaderState,
  _toast: _ToastState,
  _modal: _ModalState,
  loginForm: LoginFormState,
  geolocation: GeolocationState,
  place: PlaceState,
  user: UserState
}