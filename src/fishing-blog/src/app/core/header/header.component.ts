import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  isLogged: boolean = false;
  isExpanded: boolean = false;

toggle(): void {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded)
  }

  logout(): void {
  }
}
