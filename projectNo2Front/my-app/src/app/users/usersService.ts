import { Injectable } from "@angular/core";
import { WebRequestService } from "../web-request.service";

@Injectable({
    providedIn:"root"
})

export class UsersService {
    constructor(private WebRequestService: WebRequestService){

    }

    CreateUser(email:string,name:string){
        // we want to send a post request to create a user.
        return this.WebRequestService.post("addUser",{email,name});

    }

    SearchThem(query:string)
    {
        return this.WebRequestService.get(`search/${query}`);
    }

    GetAllUsers()
    {
        return this.WebRequestService.get('usersData');
    }

    UpdateUser(id:string, body: any)
    {
        console.log(id);
        console.log(body);
        return this.WebRequestService.patch(`updateData/${id}`, body);
    }

    DeleteUser(id:string)
    {
        return this.WebRequestService.delete(`delUserData/${id}`);
    }

    GetUserData(id:string)
    {
        return this.WebRequestService.get(`userData/${id}`);
    }
    AddUserPost(id:string, post:any)
    {
        return this.WebRequestService.post(`addPost/${id}`,post);
    }
    AddUserTask(id:string, task:any)
    {
        return this.WebRequestService.post(`addTodo/${id}`, task);
    }
}