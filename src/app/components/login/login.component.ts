import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/api/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
        username : new FormControl("", Validators.compose([Validators.required])),
        password : new FormControl("", Validators.compose([Validators.required])),
      });
   }

  ngOnInit() {
  }

  public login(credentials) {
    if (!this.loginForm.valid) {
      this.toastrService.error("", "Username and password are required");
      return;
    }
    this.authenticationService.login(credentials.username, credentials.password);
  }
}
