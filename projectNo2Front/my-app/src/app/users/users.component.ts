import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from './usersService';
import  {Modal} from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private UsersService: UsersService) { }
  inputName = "";
  inputEmail = "";
  inputSearch = "";
  @Input()usersData : any = [];
  addUserModal: Modal | undefined;
  updateUserModal: Modal | undefined;

  Open()
  {
    // function to open the add user modal instead of creating a new page
    var myModalEl = document.getElementById('staticBackdrop');
    this.addUserModal = bootstrap.Modal.getOrCreateInstance(`${myModalEl}`);
    this.addUserModal?.show();
  }
  CreateNewUser(name:string, email:string)
  {
    // i should pass the name to this function.
    // i need to create a form to pass the data (a Modal).
    this.UsersService.CreateUser(email,name).subscribe((response:any)=>{
      console.log(response);
    })
    this.addUserModal?.toggle();
  }
  Search(query:string)
  {
    // i should pass the search query and get the result back
    this.UsersService.SearchThem(query).subscribe((response:any)=>{
      console.log(response);
      this.usersData = response;

    })
  }
  GetAllUsersData()
  {
    // here i should get all the users data and present it via ngFor on the main page.
    this.UsersService.GetAllUsers().subscribe((response:any) => 
    {
      console.log(response);
      this.usersData = response; // shold be the array of all users with thier data.
    })
  }
  displayContent(id:string)
  {
    console.log(`user ${id} clicked`);
  }


  onKeyEmail(e:any)
  {
    this.inputEmail = e.target.value;

  }
  onKeyName(e:any)
  {
    this.inputName = e.target.value;

  }
  onKeySearch(e:any)
  {
    this.inputSearch = e.target.value;
  }
  ngOnInit(): void {
    this.GetAllUsersData();
  }

}
