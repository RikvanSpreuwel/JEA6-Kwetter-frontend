import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from 'src/app/services/api/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  private searchForm: FormGroup;
  public searchParam: string = "";

  constructor(
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) {
      this.searchForm = formBuilder.group({
        searchParam : new FormControl(""),
      });
  }

  ngOnInit() {
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
