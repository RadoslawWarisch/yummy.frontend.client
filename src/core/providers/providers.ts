import { Settings } from './settings/settings';
import { Rest } from './rest/rest';
import { LoginProvider } from './login-provider/login-provider';
import { Api } from './api/api';
import { GeolocationProvider } from './geolocation/geolocation-provider';
import { PlaceProvider } from './place/place-provider';

export const Providers = [
  Api,
  Settings,
  Rest,
  LoginProvider,
  GeolocationProvider,
  PlaceProvider
];
