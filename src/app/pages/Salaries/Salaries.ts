import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InquiryForm } from '../../components/inquiry-form/inquiry-form';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [InquiryForm, RouterLink, RouterLinkActive],
  templateUrl: './Salaries.html',
  styleUrl: './Salaries.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Salaries { }