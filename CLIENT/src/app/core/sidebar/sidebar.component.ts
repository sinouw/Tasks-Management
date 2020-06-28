import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: any[] = [
    { role :'admin', path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/events/calendar', title: "Calendar",  icon:'event', class: '' },
    { role :'admin', path: '/events/list', title: "Events List",  icon:'event_note', class: '' },
    { role :'admin', path: '/agents/list', title: "Agents List",  icon:'people', class: '' },
    { path: '/profile', title: "User Profile",  icon:'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isAdmin: any= "";

  constructor(private accountService : AccountService){
        let token =this.accountService.getDecodedToken();
    let currentRoles = token.roles;
    this.isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
  }
  ngOnInit(): void {
    if (!this.isAdmin) {
      this.menuItems = ROUTES.filter(menuItem => !menuItem.role);
    }else{
      this.menuItems = ROUTES.map(x=>x)
      
    }
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
