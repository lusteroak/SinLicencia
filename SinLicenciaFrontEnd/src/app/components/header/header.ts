import { Component } from '@angular/core';
import { SearchBarHeader } from '../search-bar-header/search-bar-header';
import { LogoPlaceHolder } from '../logo-place-holder/logo-place-holder';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  imports: [SearchBarHeader, LogoPlaceHolder, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  faCartShopping = faCartShopping;
}
