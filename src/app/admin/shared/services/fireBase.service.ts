import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import firebase from "firebase";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
import {switchMap} from "rxjs/operators";
import {ProfileDataInterface} from "../interfaces/profileData.intarface";

const config: any = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  databaseURL: environment.databaseURL,
  storageBucket: environment.storageBucket
}

@Injectable()
export class FireBaseService {

  constructor(private authService: AuthService) {
    this.initializeFireBase();
  }

  upLoadFileToStorage(file: any): Observable<any> {
    const storageRef = firebase.storage().ref();
    const token = localStorage.getItem('id-token');
    const metaData = {
      auth: token
    }

    if (file) {
      const storagePhotoRef = storageRef.child('images/' + file.name);
      return from(storagePhotoRef.put(file)).pipe(
        switchMap(() => {
          return from(storagePhotoRef.getDownloadURL());
        })
      );
    }

    return of('')
  }

  private initializeFireBase() {
    firebase.initializeApp(config);
  }
}
