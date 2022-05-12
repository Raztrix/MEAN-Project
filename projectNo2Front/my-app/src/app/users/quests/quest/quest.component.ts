import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../usersService';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  @Input() Title:string = "";
  @Input() Completed: Boolean = false;
  @Input() Task: any = {Title: this.Title, Completed: this.Completed};
  @Input() userTasks :any = [];
  @Input() rowNumber : number = 1;
  @Input() userDbId : string = "";
  //payload : any = {Tasks: this.userTasks[this.rowNumber].Completed = true}

  ngOnInit(): void {
  }

  // TurnToTrue(id:string, payload:any)
  // {
  //   this.usersService.UpdateUser(id,payload).subscribe((response:any) => {
  //     console.log(response);
  //   })
  // }
}
