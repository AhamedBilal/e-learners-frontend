import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {DataService} from "../../../core/services/data.service";
import {AuthService} from "../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teach',
  templateUrl: './teach.component.html',
  styleUrls: ['./teach.component.scss']
})
export class TeachComponent implements OnInit {

  constructor(private user: UserService,
              private dataService: DataService,
              private auth: AuthService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  becomeTeacher() {
    if (this.auth.getToken()) {
      this.user.becomeInstructor().subscribe(value => {
        // @ts-ignore
        this.toastr.success(value.message);
        this.dataService.currentUserData.subscribe(value1 => {
          // @ts-ignore
          this.dataService.changeUserData({...value1, role: 'ROLE_TEACHER'})
        }).unsubscribe();
        this.router.navigate(['/']);
      })
    } else {
      this.router.navigate(['/login'], {queryParams: {redirect: 'teacher'}})
    }
  }
}
