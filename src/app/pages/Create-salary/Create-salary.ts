import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SalaryForm } from '../../components/salary-form/salary-form';

@Component({
  selector: 'app-create-salary',
  imports: [SalaryForm],
  templateUrl: './Create-salary.html',
  styleUrl: './Create-salary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSalary { }
