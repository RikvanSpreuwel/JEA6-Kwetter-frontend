import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Kwetter } from "src/app/models/kwetter";
import { Role } from "src/app/models/role";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";
import { KwetterService } from "src/app/services/api/kwetter/kwetter.service";
import { UserService } from "src/app/services/api/user/user.service";

@Component({
  selector: "app-home",
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  public loggedInUser: User;
  public timeline: Kwetter[];

  public postKwetterForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private kwetterService: KwetterService,
    private toastrService: ToastrService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.postKwetterForm = this.formBuilder.group({
      kweet: new FormControl("", Validators.compose([Validators.required])),
    });

    this.authenticationService.isLoggedIn() ? this.userService.getCurrentUser().subscribe((response) => {
      this.loggedInUser = response as User;

      this.kwetterService.getTimeline(this.loggedInUser["_links"].Timeline.href).subscribe((result) => {
        this.timeline = result as Kwetter[];
      });
    })
    : this.router.navigate(["/login"]);
  }

  public postKwetter(kwetter) {
    if (kwetter === undefined || kwetter.kweet === undefined || kwetter.kweet === "") { return; }

    this.kwetterService.createKwetter(kwetter.kweet, this.loggedInUser.userId).subscribe((response) => {
      if (response !== undefined) {
        this.loggedInUser.kwetters.push(response as Kwetter);
        this.timeline.unshift(response as Kwetter);
        this.toastrService.success("", "Succesfully posted kweet: " + kwetter.kweet);
        this.getFormControl("kweet").setValue("");
      }
    });
  }

  /**
   * Returns a AbstractControl for the given name that's present in the signUpForm.
   * @param name The name of the AbstractControl that should be retrieved.
   */
  private getFormControl(name: string) {
    return this.postKwetterForm.controls[name];
  }
}
