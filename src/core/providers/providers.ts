import { Settings } from './settings/settings';
import { Rest } from './rest/rest';
import { LoginProvider } from './login-provider/login-provider';
import { Api } from './api/api';
import { GeolocationProvider } from './geolocation/geolocation-provider';
import { PlaceProvider } from './place/place-provider';
import { OfferProvider } from './offer-provider/offer-provider';
import { BucketProvider } from './bucket-provider/bucket-provider';
import { UserProvider } from './user-provider/user-provider';
import { TransactionsProvider } from './transaction-provider/transaction-provider';

export const Providers = [
  Api,
  Settings,
  Rest,
  LoginProvider,
  GeolocationProvider,
  PlaceProvider,
  OfferProvider,
  BucketProvider,
  UserProvider,
  TransactionsProvider
]
