import { Component } from '@angular/core';
import { SearchBarHeader } from '../search-bar-header/search-bar-header';
import { LogoPlaceHolder } from '../logo-place-holder/logo-place-holder';

@Component({
  selector: 'app-header',
  imports: [SearchBarHeader, LogoPlaceHolder],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
