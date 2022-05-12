import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestsComponent } from './users/quests/quests.component';
import { PostsComponent } from './users/posts/posts.component';
import { PostComponent } from './users/posts/post/post.component';
import { QuestComponent } from './users/quests/quest/quest.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    QuestsComponent,
    PostsComponent,
    PostComponent,
    QuestComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent,UsersComponent,UserComponent]
})
export class AppModule { }
