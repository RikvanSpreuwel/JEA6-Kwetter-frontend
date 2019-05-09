import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";
import { KwetterService } from "src/app/services/api/kwetter/kwetter.service";
import { UserService } from "src/app/services/api/user/user.service";
import { AuthenticationServiceSpy } from "src/utils/test/authenticationServiceSpy";
import { KwetterServiceSpy } from "src/utils/test/kwetterServiceSpy";
import { ToastrServiceStub } from "src/utils/test/toastrServiceStub";
import { UserServiceSpy } from "src/utils/test/userServiceSpy";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {path: "", redirectTo: "/", pathMatch: "full"},
  ];

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ HomeComponent ],
        imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: AuthenticationService, useValue: {} },
            { provide: UserService, useValue: {} },
            { provide: KwetterService, useValue: {} },
            { provide: ToastrService, useValue: ToastrServiceStub },
        ],
    }).overrideComponent(HomeComponent, {
        set: {
            providers: [
                { provide: AuthenticationService, useClass: AuthenticationServiceSpy },
                { provide: UserService, useClass: UserServiceSpy},
                { provide: KwetterService, useClass: KwetterServiceSpy },
            ],
        },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
