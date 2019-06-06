import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/api/user/user.service";
import { ToastrServiceStub } from "src/utils/test/componentStubs/toastrServiceStub";
import { UserServiceSpy } from "src/utils/test/serviceSpies/userServiceSpy";
import { RegistrationComponent } from "./registration.component";

const routes: Routes = [
  {path: "", redirectTo: "/", pathMatch: "full"},
];

describe("RegistrationComponent", () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: ToastrService, useValue: ToastrServiceStub },
            { provide: UserService, useValue: UserServiceSpy },
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
