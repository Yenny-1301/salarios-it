import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-salary-form',
  imports: [],
  templateUrl: './salary-form.html',
  styleUrl: './salary-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryForm { }
