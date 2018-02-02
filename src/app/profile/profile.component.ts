import { Component , OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { IPosts } from './profile_post';
import { IComments } from './profile_comments';
import { IUsers } from './profile_users';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	templateUrl: 'app/profile/profile.component.html',
	styleUrls: ['app/profile/profile.component.css']
})

export class ProfileComponent {
	allPosts: IPosts[];
	allUsers: IUsers[];
	allComments: IComments[];
	userId: number;

	constructor(private _profileService: ProfileService) {}

	ngOnInit() {
		this.getAllPosts();
		this.getAllComments();
		this.getAllUsers();
		this.getUserId();
	}

	getAllPosts(): void {
		this._profileService.getPosts()
				.subscribe(data => {this.allPosts = data;console.log("These are allPOSTS " , this.allPosts)});
	}
	
	getAllComments(): void {
		this._profileService.getComments()
				.subscribe(data => {this.allComments = data;console.log("These are allComments " , this.allComments)});
	}

	getAllUsers() {
		this._profileService.getUsers()
				.subscribe(data => {this.allUsers = data;console.log("These are allUsers " , this.allUsers)});
	}
	
	getUserId(){
		return this._profileService.getUserIdService()
				.subscribe(data => {this.userId = data;console.log("THIS IS USER ID" , this.userId)});
	}
}