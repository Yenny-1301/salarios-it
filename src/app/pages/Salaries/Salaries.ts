import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InquiryForm } from '../../components/inquiry-form/inquiry-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [InquiryForm, CommonModule],
  templateUrl: './Salaries.html',
  styleUrl: './Salaries.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Salaries { 
  // Signal para almacenar el salario promedio
  averageSalary = signal<number | null>(null);
  
  // Signal para mostrar estado de carga
  isLoading = signal(false);

  // Método que se llamará cuando el formulario calcule el promedio
  onSalaryCalculated(salary: number) {
    console.log('💰 Salario promedio recibido:', salary);
    this.averageSalary.set(salary);
    this.isLoading.set(false);
  }

  // Método para cuando empiece el cálculo
  onCalculationStarted() {
    this.isLoading.set(true);
    this.averageSalary.set(null);
  }

  // ✅ MÉTODO PARA FORMATEAR EL SALARIO
  formatSalary(salary: number): string {
    if (salary === 0) return '$0';
    
    // Formatear como moneda USD
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  }
}