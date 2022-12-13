import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import ruLocale from "@angular/common/locales/ru";

import {AuthInterceptor} from "./admin/shared/auth.interceptor";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared.module";
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {UserService} from "./admin/shared/services/user.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {FireBaseService} from "./admin/shared/services/fireBase.service";
import {MatCardModule} from "@angular/material/card";


registerLocaleData(ruLocale, 'ru');


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    HeaderComponent,
  ],
    imports: [
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule
    ],
  providers: [INTERCEPTOR_PROVIDER, UserService, FireBaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
