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


	constructor(private _formBuilder: FormBuilder , private _profileService: ProfileService , private _router: Router) {
		this.welcome = "Welcome to Dunder-Mifflin";
		this.subtitleOne = "Welcome to the dunder-mifflin internal network.";
		this.subtitleTwo = "Please enter a username to see your posts and comments.";

		this.createForm();
	}
	
	ngOnInit() {
		this.getAllUsers();
	}

	getAllUsers(): void {
		this._profileService.getUsers()
			.subscribe(data => this.allUsers = data, err => console.log("These are API errors" , err))
	}

	createForm(): void{
		this.rForm = this._formBuilder.group({
			email: ['' , [Validators.required , Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
		})
	}

	userLogin(postData) {
		this.loginAttemptEmail = postData.email;
		console.log("login attempt email..." , this.loginAttemptEmail);

		for (let usr of this.allUsers) {
			if (usr.email.toLowerCase() == this.loginAttemptEmail) {
				console.log("This IS a matching email::" , usr.email);
				this.userId = usr.id;
				this._profileService.setUserId(this.userId);
				this.canLogin = true;
				this.hideErr = false;
				this._profileService.setUserLoggedIn(true);
				this._router.navigate(['/profile/' + this.userId]);
				break;
			}
			else {
				this.canLogin = false;
				this.hideErr = false;
				console.log("This is NOT a matching email::" , usr.email);
			}
		}
	}
}