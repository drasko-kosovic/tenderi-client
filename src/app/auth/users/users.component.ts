import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/tender/model/users.model';
import { UserService } from '../login/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public displayedColumns = [ 'id','username','email','password'];

  public dataSource = new MatTableDataSource<Users>();

  


  
  constructor(private userService:UserService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllUsers();
  }

  // tslint:disable-next-line:typedef
  public getAllUsers()  {
    this.userService.getUsers()
      .subscribe(res => {
        this.dataSource.data = res as Users[];
      });
  }

  
}