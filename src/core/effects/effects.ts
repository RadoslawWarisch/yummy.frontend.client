import { LoginFormEffects } from "./login-form/login-form.effects";
import { PlaceEffects } from "./place/place.effects";
import { GeolocationEffects } from "./geolocation/geolocation.effects";
import { UserEffects } from "./user/user.effects";
import { OfferEffects } from "./offer/offer.effects";
import { BucketEffects } from "./bucket/bucket.effects";
import { TransactionEffects } from "./transaction/transaction.effects";

export const Effects = [
  LoginFormEffects,
  PlaceEffects,
  GeolocationEffects,
  UserEffects,
  OfferEffects,
  BucketEffects,
  TransactionEffects
];