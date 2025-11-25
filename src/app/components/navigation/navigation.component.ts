import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMenuOpen = false;
  isDropdownOpen = false;
  
  constructor(private router: Router) {}
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isDropdownOpen = false;
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  isDropdownActive(): boolean {
    // Check if any of the dropdown routes are active
    const dropdownRoutes = ['/services', '/products', '/our-works', '/about-us'];
    return dropdownRoutes.some(route => 
      this.router.isActive(route, false)
    );
  }

  
}