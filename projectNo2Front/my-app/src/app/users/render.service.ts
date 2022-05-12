import { Injectable, Output, Input, EventEmitter } from '@angular/core';
import { UsersService } from './usersService'

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(private UsersService: UsersService) { }

  @Output() RenderDataEvent = new EventEmitter<any>();
  bgColor:string = '#BFFFF0';
  street : string = "";
  city : string = "";
  zip:string = "";
  PostsData:any = [];
  TodoData:any = [];
  userName:string = "";
  @Input() userDbId: string = "";

  GetUserById(id:string)
  {
    this.UsersService.GetUserData(id).subscribe((response:any) => {
      //console.log(response);
      this.street = response.Street;
      this.city = response.City;
      this.zip = response.Zipcode;
      this.PostsData = response.Posts;
      this.TodoData = response.Tasks;
      this.userDbId = response._id;
      this.userName = response.Name;
    })
  }
  DisplayContent(id: string)
  {
    // get the data of the specific clicked user.
    this.GetUserById(id);
    // display the data in the second col of the users component.
    // by runing on the todos or the posts data.
    return {Todos: this.TodoData, Posts: this.PostsData, Id: this.userDbId, Name: this.userName};
  }
  Render(id:string):void
  {
    let Function:any = this.DisplayContent(id);
    this.RenderDataEvent.emit(Function);
  }

}
