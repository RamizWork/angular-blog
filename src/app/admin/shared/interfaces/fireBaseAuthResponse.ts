export interface FireBaseAuthResponse {
  "kind"?: string;
  "localId"?: string;
  "email": string;
  "displayName": string;
  "idToken"?: string;
  "expiresIn"?: string;
  "registered"?: true;
  "refreshToken"?: string;
}
