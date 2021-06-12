import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData: any;

  username: any;
  fileURI = environment.fileURI;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.getUserByUsername(value.get('username'));
    })
  }

  getUserByUsername(username: any) {
    this.userService.getUserByUsername(username).subscribe(value => {
      this.userData = value;
    }, error => {
      this.router.navigate(['/']);
    })
  }

}
