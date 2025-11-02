import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './Login.html',
  styleUrl: './Login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login { }
