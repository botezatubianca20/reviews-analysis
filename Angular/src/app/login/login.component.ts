import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = SocialUser;
 

  // @Output() showLogOut = new EventEmitter<boolean>();
  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
    // console.log(localStorage.getItem('name'));
    // console.log(localStorage.getItem('email'));
 
    if(localStorage.getItem('name')){
      // this.showLogOut.emit(true);;
    }


  }

  // facebookLogin(){
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
  //     this.user = userData;
  //   })
  // }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      // console.log(this.user);
      localStorage.setItem('name', this.user.name);
      localStorage.setItem('email', this.user.email);
      // this.showLogOut.emit(true);
    })
  }

}
