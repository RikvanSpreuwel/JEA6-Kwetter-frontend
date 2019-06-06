import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";
import { UserService } from "src/app/services/api/user/user.service";

@Component({
  selector: "app-login",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {
      this.loginForm = formBuilder.group({
        password : new FormControl("", Validators.compose([Validators.required])),
        username : new FormControl("", Validators.compose([Validators.required])),
      });
   }

  public ngOnInit() {
  }

  public async login(credentials) {
    if (!this.loginForm.valid) {
      this.toastrService.error("", "Username and password are required");
      return;
    }
    const loggedIn: boolean = await this.authenticationService.login(credentials.username, credentials.password);
    if (loggedIn) {
      const loggedInUser: User = await this.userService.getCurrentUser();
      if (loggedInUser.verified) {
        this.toastrService.success("", "Succesfully logged in!");
        this.router.navigate(["/"]);
      } else {
        this.authenticationService.logout();
        this.userService.removeCurrentUser();
        this.toastrService.error("", "Account is not yet verified, check your email"
        + " for our verification mail to verify your account");
      }
    } else {
      this.toastrService.error("", "Incorrect login credentials!");
    }
  }
}
