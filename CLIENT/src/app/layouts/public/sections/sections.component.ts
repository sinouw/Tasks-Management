import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  currentRoles: any = []

  constructor(private router: Router, private accountService: AccountService) {
    let token = this.accountService.getDecodedToken();
    this.currentRoles = token.roles;
    let isAdmin = this.currentRoles.some(role => this.currentRoles.includes("admin"));
    if (isAdmin) {
      this.router.navigateByUrl('/dashboard');
    }

    
  }

  goToCalendar(section) {
    console.log(section)
    localStorage.setItem('section', section)
    this.router.navigateByUrl('/events/calendar')
  }

}
