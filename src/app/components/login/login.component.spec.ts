import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";
import { UserService } from "src/app/services/api/user/user.service";
import { ToastrServiceStub } from "src/utils/test/componentStubs/toastrServiceStub";
import { AuthenticationServiceSpy } from "src/utils/test/serviceSpies/authenticationServiceSpy";
import { UserServiceSpy } from "src/utils/test/serviceSpies/userServiceSpy";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  {path: "", redirectTo: "/", pathMatch: "full"},
];


describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: AuthenticationService, useValue: {} },
            { provide: ToastrService, useValue: ToastrServiceStub },
            { provide: UserService, useValue: UserServiceSpy },
        ],
    }).overrideComponent(LoginComponent, {
        set: {
            providers: [
                { provide: AuthenticationService, useClass: AuthenticationServiceSpy },
            ],
        },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
