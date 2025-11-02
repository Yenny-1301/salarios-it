import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/Navigation/Navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'salarios-it';
}
