// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {EnvironmentInterface} from "./environment.interface";

export const environment: EnvironmentInterface = {
  apiKey: 'AIzaSyB95RQ2a6oJvar_9am8hHaCIsPCbaDkz1Y',
  production: false,
  fbDbUrl: 'https://angular-blog-b833e-default-rtdb.europe-west1.firebasedatabase.app',
  authDomain: 'angular-blog-b833e.firebaseapp.com',
  databaseURL: 'https://angular-blog-b833e-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'gs://angular-blog-b833e.appspot.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
