import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule , Routes } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { ProfileComponent }  from './profile/profile.component';
import { ProfileService }  from './profile/profile.service';
import { FilterPostsPipe }  from './profile/profile.pipe';
import { FilterUserPipe }  from './profile/profile_users.pipe';
import { ProfileGuard }  from './profile/profile_guard.guard';

const sixVertRoutes: Routes = [
	{
		path: '' ,
		component: HomeComponent,
	},
	{
		path: 'profile/:id' ,
		canActivate: [ ProfileGuard ],
		component: ProfileComponent
	},
	{
		path: '**' ,
		redirectTo: '/',
		pathMatch: 'full'
	}
];



@NgModule({
  imports:      [ BrowserModule , FormsModule , ReactiveFormsModule , RouterModule.forRoot(sixVertRoutes) , HttpModule ],
  declarations: [ AppComponent , HomeComponent , ProfileComponent , FilterPostsPipe , FilterUserPipe ],
  providers: 	[ ProfileService , ProfileGuard ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
