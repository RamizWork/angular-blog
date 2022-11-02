export interface ResponseForIdentificatedEmailInterface {
  "kind": string;
  "users": [
    {
      "localId": string;
      "email": string;
      "passwordHash": string;
      "emailVerified": boolean;
      "passwordUpdatedAt": number;
      "photoUrl"?: string;
      "firstName"?: string;
      "lastName"?: string;
      "providerUserInfo": [
        {
          "providerId": string;
          "federatedId": string;
          "email": string;
          "rawId": string;
        }
      ],
      "validSince": string;
      "disabled": boolean;
      "lastLoginAt": string;
      "createdAt": string;
      "lastRefreshAt": string;
    }
  ]
}
