import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { JwtHelperServiceStub } from "src/utils/test/jwtHelperServiceStub";
import { ToastrServiceStub } from "src/utils/test/toastrServiceStub";
import { AuthenticationService } from "./authentication.service";

const routes: Routes = [
    {path: "", redirectTo: "/", pathMatch: "full"},
  ];

describe("AuthenticationService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: ToastrService, useValue: ToastrServiceStub},
            { provide: JwtHelperService, useValue: JwtHelperServiceStub },
          ],
    }));

    it("should be created", () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
