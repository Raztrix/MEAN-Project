import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Collapse } from 'bootstrap';
import { UsersService } from '../usersService';
import * as bootstrap from 'bootstrap';
import { RenderService } from '../render.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private UsersService: UsersService, private RenderService: RenderService, public elementRef: ElementRef) { }
  @Input() userId: number = 0;
  @Input() userName : string = "Bob"
  @Input() userEmail : string = "bobi@bob.co.il"
  @Input() userDbId: string = "";
  updateUserModal:Modal | undefined
  @Input() street:string = "";
  @Input() city:string = "";
  @Input() zip:number = 0;
  @Input() allUsersData: any = [];
  @Input() PostsData : any = [];
  @Input() TodoData : any = [];
  moreData : Collapse | undefined;
  bgColor : string = '#BFFFF0';
  @ViewChild('userCardDiv', {static:false}) userCardDiv: ElementRef;


  UpdateUserById()
  {
    let idFromDb:string = this.userDbId;
    let payload:any = {Name: this.userName, Email: this.userEmail, Street: this.street, City: this.city, Zipcode: this.zip}
    // the id should pass automatically to the function by pressing the update button.
    this.UsersService.UpdateUser(idFromDb,payload).subscribe((response:any) => {
      console.log(response);
    })
    this.updateUserModal?.toggle();
    location.reload();
  }

  DeleteUserById(idFromDb:string)
  {
    this.UsersService.DeleteUser(idFromDb).subscribe((response:any) => {
      console.log(response);
    })
  }

  GetUserById(id:string)
  {
    this.UsersService.GetUserData(id).subscribe((response:any) => {
      console.log(response);
      this.street = response.Street;
      this.city = response.City;
      this.zip = response.Zipcode;
      this.PostsData = response.Posts;
      this.TodoData = response.Tasks;
      this.TodoData.forEach(task => {
        if(task.Completed == false)
        {
          this.userCardDiv.nativeElement.className = "card border border-3 border-danger";
        }
        
      });
    })
  }
  OpenUpdateModal()
  {

    /* 
      * function to open the upade usermodal instead of creating a new page.
    */
    let updateModal = document.getElementById('updateModal');
    console.log(updateModal);
    this.updateUserModal = bootstrap.Modal.getOrCreateInstance(`${updateModal}`);
  }
  onChange(e:any)
  {
    this.userDbId = e.target.value;
    console.log(e.target.value);
  }

  // collapseData()
  // {
  //   let myCollapse = document.getElementById('multiCollapseExample1');
  //   this.moreData = bootstrap.Collapse.getOrCreateInstance(`${myCollapse}`);
  //   this.moreData?.toggle();
  // }
  RenderContent(id:string)
  {
    id = this.userDbId;
    this.RenderService.Render(id);
  }

  ngOnInit(): void {
    this.GetUserById(this.userDbId);
  }

}
