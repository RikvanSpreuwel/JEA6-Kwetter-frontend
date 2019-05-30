import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";
import { UserService } from "src/app/services/api/user/user.service";
import { SearchResultsComponentStub } from "src/utils/test/componentStubs/searchResultsStubComponent";
import { ToastrServiceStub } from "src/utils/test/componentStubs/toastrServiceStub";
import { AuthenticationServiceSpy } from "src/utils/test/serviceSpies/authenticationServiceSpy";
import { UserServiceSpy } from "src/utils/test/serviceSpies/userServiceSpy";
import { NavbarComponent } from "./navbar.component";

const routes: Routes = [
    {path: "", redirectTo: "/", pathMatch: "full"},
  ];

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ NavbarComponent, SearchResultsComponentStub ],
        imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: AuthenticationService, useValue: {} },
            { provide: UserService, useValue: {} },
            { provide: ToastrService, useValue: ToastrServiceStub },
        ],
    }).overrideComponent(NavbarComponent, {
        set: {
            providers: [
                { provide: AuthenticationService, useClass: AuthenticationServiceSpy },
                { provide: UserService, useClass: UserServiceSpy },
            ],
        },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
