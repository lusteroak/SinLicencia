import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Nav } from '../../components/nav/nav';
import { HeroSlider } from '../../components/hero-slider/hero-slider';
import { ContentSection } from '../../components/content-section/content-section';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, Nav, HeroSlider, ContentSection,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
