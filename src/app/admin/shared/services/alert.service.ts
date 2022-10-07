import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {AlertInterface} from "../interfaces/alert.interface";

export type AlertType = 'success' | 'warning' | 'danger';

@Injectable()
export class AlertService {
  public alert$ = new Subject<AlertInterface>();

  success(text: string) {
    this.alert$.next({type: 'success', text});
  }

  warning(text: string) {
    this.alert$.next({type: 'warning', text});
  }

  danger(text: string) {
    this.alert$.next({type: 'danger', text});
  }
}
