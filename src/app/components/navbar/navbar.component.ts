import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/api/authentication/authentication.service";

@Component({
  selector: "app-navbar",
  styleUrls: ["./navbar.component.css"],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  public searchParam: string = "";
  private searchForm: FormGroup;

  constructor(
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) {
      this.searchForm = formBuilder.group({
        searchParam : new FormControl(""),
      });
  }

// tslint:disable-next-line: no-empty
  public ngOnInit() {
  }

  private logout() {
    this.clearSearchParam();
    this.authenticationService.logout();
    this.toastrService.success("", "Succesfully logged out.");
  }

  private setSearchParam(searchParam: string) {
    this.searchParam = searchParam;
  }

  private clearSearchParam() {
    this.searchParam = "";
    this.getFormControl("searchParam").setValue("");
  }

  /**
   * Returns a AbstractControl for the given name that's present in the signUpForm.
   * @param name The name of the AbstractControl that should be retrieved.
   */
  private getFormControl(name: string) {
    return this.searchForm.controls[name];
  }
}
