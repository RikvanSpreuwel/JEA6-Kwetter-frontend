import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";
import { ToastrServiceStub } from "src/utils/test/componentStubs/toastrServiceStub";
import { AuthenticationServiceSpy } from "src/utils/test/serviceSpies/authenticationServiceSpy";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [FormsModule, ReactiveFormsModule],
        providers: [
            { provide: AuthenticationService, useValue: {} },
            { provide: ToastrService, useValue: ToastrServiceStub },
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
