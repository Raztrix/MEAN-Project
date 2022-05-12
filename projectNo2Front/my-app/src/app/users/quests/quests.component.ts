
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RenderService } from '../render.service';
import { UsersService } from '../usersService';
import  {Modal} from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit {

  constructor(private RenderService: RenderService, public elementRef: ElementRef, private usersService: UsersService) { }
  @Input() userDbId : string = "";
  @Input() userTasks : any = [];
  @Input() Title:string = "";
  @Input() Completed: Boolean = false;
  @Input() Task : any = {Title: this.Title, Completed: this.Completed}
  @ViewChild('tasksDiv', {static:false}) tasksDiv: ElementRef;
  taskModal: Modal | undefined;
  @Input() userName:string = "";

  ngOnInit(): void {
        /*
     * Here is should subscribe to the event.
     * get the tasks array from the object.
     * generate inside the subscribe the div with the data to display.
     * generate Add button on top of the div and see what else. 
     */
        this.RenderService.RenderDataEvent.subscribe((data:any) => {
          this.userDbId = data.Id;
          this.userName = data.Name;
          console.log(data);
          //console.log(data.Id);
          // toggle the task div
          if(this.tasksDiv.nativeElement.className == "d-none"){
            this.tasksDiv.nativeElement.className="d-block";
          }
          else
          {
            this.tasksDiv.nativeElement.className="d-none";
          }
          this.userTasks = data.Todos;
        })
  }

  OpenModal()
  {
        // function to open the add user modal instead of creating a new page
        var myModalEl = document.getElementById('taskModal');
        this.taskModal = bootstrap.Modal.getOrCreateInstance(`${myModalEl}`);
        this.taskModal?.show();
  }

  AddTask(id:string, Task:any)
  {
    this.usersService.AddUserTask(id,Task).subscribe((response:any) => {
      console.log(response);
    })
  }

}
