import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/api/user/user.service";

@Component({
  selector: "app-registration",
  styleUrls: ["./registration.component.css"],
  templateUrl: "./registration.component.html",
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.registrationForm = formBuilder.group({
      bio : new FormControl(""),
      dateOfBirth : new FormControl("", Validators.compose([Validators.required])),
      email : new FormControl("", Validators.compose([Validators.required])),
      firstname : new FormControl("", Validators.compose([Validators.required])),
      lastname : new FormControl("", Validators.compose([Validators.required])),
      location : new FormControl("", Validators.compose([Validators.required])),
      password : new FormControl("", Validators.compose([Validators.required])),
      username : new FormControl("", Validators.compose([Validators.required])),
    });
  }

  public ngOnInit() {

  }

  public register(formData) {
    if (!this.registrationForm.valid) {
      this.toastrService.error("", "Not all data is filled in correctly");
      return;
    }

    const jsonPostBody = {
      bio: formData.bio,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      firstName: formData.firstname,
      lastName: formData.lastname,
      location: formData.location,
      password: formData.password,
      profilePicture: null,
      role: "ROLE_USER",
      userName: formData.username,
    };

    this.userService.registerUser(jsonPostBody).subscribe((response) => {
      if (response === undefined) {
        this.toastrService.error("Failed to register");
      } else {
        this.toastrService.success("Successfully registered your account, "
        + "a verification email has been send to your email address.");
        this.router.navigate(["/login"]);
      }
    });
  }
}
