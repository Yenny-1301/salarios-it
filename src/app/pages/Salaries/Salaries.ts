import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InquiryForm } from '../../components/inquiry-form/inquiry-form';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [InquiryForm],
  templateUrl: './Salaries.html',
  styleUrl: './Salaries.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Salaries { }