import { Component, OnInit } from "@angular/core";
import { Kwetter } from 'src/app/models/kwetter';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public loggedInUser: User;
  public userProfile: User;
  
  private loggedInUserFollowingUserProfile:boolean = false;


  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.paramMap.subscribe(pmap => this.getUser(pmap.get("id")));
    this.userService.getCurrentUser().subscribe((response) => {
      this.loggedInUser = response as User;
      this.isBeingFollowedByLoggedInUser();
    });
  }

  private getUser(userId: string){
    this.userService.getById(userId).subscribe((response) => {
      this.userProfile = response as User;
      this.isBeingFollowedByLoggedInUser();
    });
  }

  private follow() {
    this.userService.followUser(this.loggedInUser.id, this.userProfile.id).subscribe((response) => {
      if (response) {
        this.loggedInUser.following.push(this.userProfile);
        this.toastrService.success("Now following: " + this.userProfile.userName);
        this.isBeingFollowedByLoggedInUser();
      } else {
        this.toastrService.error("Something went wrong following " + this.userProfile.userName);
      }
    });
  }

  private unfollow() {
    this.userService.unFollowUser(this.loggedInUser.id, this.userProfile.id).subscribe((response) => {
      if (response) {
        this.loggedInUser.following.filter((followedUser) => followedUser.id !== this.userProfile.id);
        this.toastrService.success("Stopped following: " + this.userProfile.userName);
        this.isBeingFollowedByLoggedInUser();
      } else {
        this.toastrService.error("Something went wrong unfollowing " + this.userProfile.userName);
      }
    });
  }
  
  private isBeingFollowedByLoggedInUser() {
    if (this.loggedInUser === undefined || this.userProfile === undefined) {
      this.loggedInUserFollowingUserProfile = false;
      return;
    }
    this.loggedInUser.following.forEach((followedUser) => {
      if ((followedUser.id) === this.userProfile.id) {
        this.loggedInUserFollowingUserProfile = true;
      }
    });
  };
}
