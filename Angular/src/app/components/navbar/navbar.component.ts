import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showLogOut: boolean;

  constructor(private router: Router) {
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        console.log("current url", event.url); // event.url has current url
        // your code will goes here
        console.log(localStorage.getItem('name'));
        if (localStorage.getItem('name') != null) {
          if (event.url == '/recommendation' || event.url == '/home' || event.url == '/search' || event.url == '/genres' || event.url == '/reviews') {
            this.showLogOut = true;
          }
        }
      }
    });
  }

  ngOnInit() {
    let currentUrl = this.router.url;
    console.log(currentUrl)
    if (localStorage.getItem('name') != null) {
      this.showLogOut = true;
      console.log(this.showLogOut)
    }


  }

  ngOnChange() {
    if (localStorage.getItem('name') != null) {
      this.showLogOut = true;
      console.log(this.showLogOut)

    }
  }

  logOut() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.showLogOut = false;
  }




}
