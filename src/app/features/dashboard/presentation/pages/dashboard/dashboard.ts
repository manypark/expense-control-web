import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.html',
  styleUrl    : './dashboard.css',
  imports     : [
    RouterLink,
    RouterLinkActive,
  ],
})

export default class Dashboard {}