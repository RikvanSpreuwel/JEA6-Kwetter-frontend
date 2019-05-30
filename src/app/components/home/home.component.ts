import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { StompService } from "@stomp/ng2-stompjs";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { Kwetter } from "src/app/models/kwetter";
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
  public timeline: Kwetter[] = [];

  public postKwetterForm: FormGroup;

  private postedKwetterMessagesReceived: number = 0;
  private topicSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private kwetterService: KwetterService,
    private toastrService: ToastrService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private stompService: StompService,
    private titleService: Title,
  ) { }

  public ngOnInit() {
    this.initializeWebSocketConnection();

    this.postKwetterForm = this.formBuilder.group({
      kweet: new FormControl("", Validators.compose([Validators.required])),
    });

    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(["/login"]);
    }

    this.initializeUserAndTimeline();
  }

  public ngOnDestroy() {
    this.topicSubscription.unsubscribe();
    this.titleService.setTitle("Kwetter");
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

  private initializeWebSocketConnection() {
    this.topicSubscription = this.stompService.watch("/topic/tweets").subscribe((message) => {
      if (message.body) {
        if (this.loggedInUser.following.some((user) => user.userId === JSON.parse(message.body)["authorId"])) {
          this.postedKwetterMessagesReceived++;
          this.titleService.setTitle(`(${this.postedKwetterMessagesReceived}) Kwetter`);
        }
      }
    });
  }

  private async initializeUserAndTimeline() {
    this.loggedInUser = await this.userService.getCurrentUser();

    if (this.loggedInUser["_links"]) {
      this.kwetterService.getTimeline(this.loggedInUser["_links"].Timeline.href).subscribe((result) => {
        this.timeline = result as Kwetter[];
      });
    }
  }

  /**
   * Returns a AbstractControl for the given name that's present in the signUpForm.
   * @param name The name of the AbstractControl that should be retrieved.
   */
  private getFormControl(name: string) {
    return this.postKwetterForm.controls[name];
  }


}

export class Ding {
  public authorId: string;
  public postedOn: string;
}
