import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService } from "ngx-toastr";
import { KwetterService } from "src/app/services/api/kwetter/kwetter.service";
import { UserService } from "src/app/services/api/user/user.service";
import { ToastrServiceStub } from "src/utils/test/componentStubs/toastrServiceStub";
import { KwetterServiceSpy } from "src/utils/test/serviceSpies/kwetterServiceSpy";
import { UserServiceSpy } from "src/utils/test/serviceSpies/userServiceSpy";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
    {path: "", redirectTo: "/", pathMatch: "full"},
  ];

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ ProfileComponent ],
        imports: [RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: UserService, useValue: {} },
            { provide: ToastrService, useValue: ToastrServiceStub },
        ],
    }).overrideComponent(ProfileComponent, {
        set: {
            providers: [
                { provide: UserService, useClass: UserServiceSpy },
            ],
        },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
