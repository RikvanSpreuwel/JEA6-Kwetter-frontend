import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";

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
    private formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
        password : new FormControl("", Validators.compose([Validators.required])),
        username : new FormControl("", Validators.compose([Validators.required])),
      });
   }

  public ngOnInit() {
  }

  public login(credentials) {
    if (!this.loginForm.valid) {
      this.toastrService.error("", "Username and password are required");
      return;
    }
    this.authenticationService.login(credentials.username, credentials.password);
  }
}
