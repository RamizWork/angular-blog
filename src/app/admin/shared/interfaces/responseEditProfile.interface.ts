export interface ResponseEditProfileInterface {
  "localId": string;
  "email": string;
  "displayName": string;
  "photoUrl"?: string;
  "passwordHash": string;
  "providerUserInfo": [
    {
      "providerId": string;
      "federatedId": string;
      "displayName": string;
      "photoUrl": string;
    }
  ],
  "idToken": string;
  "refreshToken": string;
  "expiresIn": string;
}
