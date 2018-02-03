import { Component , OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators , FormControl } from '@angular/forms';
import { LowerCasePipe } from '@angular/common';
import { ProfileService } from '../profile/profile.service';
import { IUsers } from '../profile/profile_users';
import { Router } from '@angular/router';

@Component({
	templateUrl: 'app/home/home.component.html',
	styleUrls: ['app/home/home.component.css']
})

export class HomeComponent implements OnInit {
	welcome: string;
	subtitleOne: string;
	subtitleTwo: string;
	rForm: FormGroup;

	loginAttemptEmail: string;
	allUsers: IUsers[];
	userId: number;
	hideErr: boolean = true;
	canLogin: boolean;

	// Dependency Injection (long hand)
	// private _formBuilder: FormBuilder;
	// constructor(_formBuilder: FormBuilder) {
	// 	this._formBuilder = _formBuilder;
	// }

	//DI's for Forms, Profile Service, Angular Router
	constructor(private _formBuilder: FormBuilder , private _profileService: ProfileService , private _router: Router) {
		this.welcome = "Welcome to Dunder-Mifflin";
		this.subtitleOne = "Welcome to the dunder-mifflin internal network.";
		this.subtitleTwo = "Please enter a username to see your posts and comments.";
	}
	
	ngOnInit() {
		this.getAllUsers();
		this.createForm();
	}

	//Subscribes to user data from the Service
	getAllUsers(): void {
		this._profileService.getUsers()
			.subscribe(data => this.allUsers = data, err => console.log("These are API errors" , err))
	}

	//Instantiates form instance
	createForm(): void{
		this.rForm = this._formBuilder.group({
			email: ['' , [Validators.required , Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
		})
	}

	//Handles form submission
	userLogin(postData) {
		this.loginAttemptEmail = postData.email;//Sets post data to variable
		console.log("login attempt email..." , this.loginAttemptEmail);

		for (let usr of this.allUsers) {//Loops thru users array and compares submission
			if (usr.email.toLowerCase() == this.loginAttemptEmail) {
				this.userId = usr.id;
				this._profileService.setUserId(this.userId);//Sends user ID to Service
				this.canLogin = true;//Boolean for displaying login err
				this.hideErr = false;//Boolean for displaying login err
				this._profileService.setUserLoggedIn(true);//Sends boolean to Service for the Route Guard
				this._router.navigate(['/profile/' + this.userId]);//Routes user to profile page
				break;
			}
			else {
				this.canLogin = false;//Boolean for displaying login err
				this.hideErr = false;//Boolean for displaying login err
			}
		}
	}
}