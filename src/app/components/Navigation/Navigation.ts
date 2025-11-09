import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './Navigation.html',
  styleUrl: './Navigation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation { }
