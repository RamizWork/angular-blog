import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay: number = 5000;

  public text: string | undefined;
  public type: string = 'success';
  alertSub$: Subscription | undefined;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertSub$ = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.alertSub$) {
      this.alertSub$.unsubscribe();
    }
  }



}
