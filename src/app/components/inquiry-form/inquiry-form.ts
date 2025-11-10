import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inquiry-form', // ← CAMBIAR de 'app-salary-form' a 'app-inquiry-form'
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-form.html',
  styleUrl: './inquiry-form.css',
})
export class InquiryForm {
  
}