
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RenderService } from '../render.service';
import { UsersService } from '../usersService';
import * as bootstrap from 'bootstrap';
import  {Modal} from 'bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private RenderService: RenderService, public elementRef: ElementRef, private usersService: UsersService) { }

 @Input() userDbId : string = "";
 @Input() userPosts : any = [];
 @Input() Title: string = "";
 @Input() Body:string = "";
 @Input() userName: string = "";
 @Input() Post : any = {Title: this.Title, Body: this.Body};
 @ViewChild('postsDiv', {static:false}) postsDiv: ElementRef;
 postModal: Modal | undefined;

  ngOnInit():void {
    /*
     * Here is should subscribe to the event.
     * get the posts array from the object.
     * generate inside the subscribe the div with the data to display.
     * generate Add button on top of the div and see what else. 
     */
    this.RenderService.RenderDataEvent.subscribe((data:any) => {
      this.userDbId = data.Id;
      this.userName = data.Name;
      //console.log(data);
      //console.log(data.Id);
      // toggle the post div
      if(this.postsDiv.nativeElement.className == "d-none"){
        this.postsDiv.nativeElement.className="d-block";
      }
      else
      {
        this.postsDiv.nativeElement.className="d-none";
      }
      this.userPosts = data.Posts;
    })
  }

  AddPost(id:string, post:any)
  {
    console.log(id);
    this.usersService.AddUserPost(id,post).subscribe((response:any) => {
      console.log(response);
    })
  }
  
  OpenModal()
  {
        // function to open the add user modal instead of creating a new page
        var myModalEl = document.getElementById('postModal');
        this.postModal = bootstrap.Modal.getOrCreateInstance(`${myModalEl}`);
        this.postModal?.show();
  }

}
