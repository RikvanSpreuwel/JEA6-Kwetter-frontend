import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AppRoutingModule } from "./routing/app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { JwtHttpInterceptor } from './interceptors/jwtHttpInterceptor';
import { SearchResultsComponent } from './components/search-results/search-results.component';


export function getAccessToken(): string {
  return localStorage.getItem("access_token");
}

export const jwtConfig = {
  tokenGetter: getAccessToken
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
      config: jwtConfig
    }),
    ToastrModule.forRoot({
      enableHtml: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
  ],
})
export class AppModule { }

