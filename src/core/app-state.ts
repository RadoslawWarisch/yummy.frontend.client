import { _RouteState } from "./reducers/_route/_route.reducer";
import { _LoaderState } from "./reducers/_loader/_loader.reducer";
import { _ToastState } from "./reducers/_toast/_toast.reducer";
import { _ModalState } from "./reducers/_modal/_modal.reducer";
import { LoginFormState } from "./reducers/login-form/login-form.reducer";
import { GeolocationState } from "./reducers/geolocation/geolocation.reducer";
import { PlaceState } from "./reducers/place/place.reducer";
import { UserState } from "./reducers/user/user.reducer";
import { OfferState } from "./reducers/offer/offer.reducer";
import { BucketState } from "./reducers/bucket/bucket.reducer";
import { TransactionState } from "./reducers/transaction/transaction.reducer";
import { _AlertState } from "./reducers/_alert/_alert.reducer";

export interface AppState {
  _alert: _AlertState,
  _route: _RouteState,
  _loader: _LoaderState,
  _toast: _ToastState,
  _modal: _ModalState,
  loginForm: LoginFormState,
  geolocation: GeolocationState,
  place: PlaceState,
  user: UserState,
  offer: OfferState,
  bucket: BucketState,
  transaction: TransactionState
}