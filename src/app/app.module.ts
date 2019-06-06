import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { StompConfig, StompService } from "@stomp/ng2-stompjs";
import { ToastrModule } from "ngx-toastr";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { JwtHttpInterceptor } from "./interceptors/jwtHttpInterceptor";
import { AppRoutingModule } from "./routing/app-routing.module";
import { KwetterStompConfig } from "./stomp.conf";


export function getAccessToken(): string {
  return localStorage.getItem("access_token");
}

export const jwtConfig = {
  tokenGetter: getAccessToken,
};


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SearchResultsComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: jwtConfig,
    }),
    ToastrModule.forRoot({
      enableHtml: true,
    }),
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: KwetterStompConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
  ],
})
export class AppModule { }

