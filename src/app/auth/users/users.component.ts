import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from 'src/app/tender/model/users.model';
import { UserService } from '../login/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  public displayedColumns = [ 'id','username','email'];

  public dataSource = new MatTableDataSource<Users>();

  


  
  constructor(private userService:UserService,private router:Router) { }

  
  ngOnInit() {
    this.getAllUsers();
  }

  
  public getAllUsers()  {
    this.userService.getUsers()
      .subscribe(res => {
        this.dataSource.data = res as Users[];
      });
  }
Close(){

  this.router.navigate(['/home']);
}
  
}