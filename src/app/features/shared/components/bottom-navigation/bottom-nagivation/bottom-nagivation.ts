import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector    : 'app-bottom-nagivation',
  templateUrl : './bottom-nagivation.html',
  styleUrl    : './bottom-nagivation.css',
  imports     : [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
})

export default class BottomNagivation {}