import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SalaryService, SalaryFormData, FilterOptions } from '../../services/salary';

@Component({
  selector: 'app-salary-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary-form.html',
  styleUrl: './salary-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryForm implements OnInit{
  private salaryService = inject(SalaryService);

  selectedArea = signal<string | null>(null);
  selectedLocation = signal<string | null>(null);
  selectedPosition = signal<string | null>(null);
  selectedExperienceLevel = signal<string | null>(null);
  enteredSalary = signal<number | null>(null);

  work_fields = signal<string[]>(['Desarrollo', 'DevOps', 'QA', 'Management']);
  experience_levels = signal<string[]>(['Junior', 'Mid', 'Senior', 'Lead']);
  locations = signal<string[]>(['Buenos Aires', 'Córdoba', 'Remoto']);
  positions = signal<string[]>(['Frontend Dev', 'Backend Dev', 'Fullstack']);
  isFormValid = signal<boolean>(false);

  errorMessage = signal<string>('');
  submitStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');


  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions() {
    this.salaryService.getFilterOptions().subscribe({
      next: (filters: FilterOptions) => {
        console.log('✅ [INQUIRY-FORM] Filtros cargados:', filters);
        this.work_fields.set(filters.areas);
        this.experience_levels.set(filters.experienceLevels);
        this.locations.set(filters.locations);
        this.positions.set(filters.positions);
      },
      error: (error) => {
        console.error('❌ [INQUIRY-FORM] Error cargando filtros:', error);
        this.setDefaultFilters();
      }
    });
  }

  onSubmit() {
    if (!this.selectedArea() || this.enteredSalary() === null) {
      this.errorMessage.set('Por favor, completa todos los campos requeridos.');      this.submitStatus.set('error');
      return;
    }
    
    const salaryData: SalaryFormData = {
      area: this.selectedArea()!,
      location: this.selectedLocation() || 'N/A',
      position: this.selectedPosition() || 'N/A',
      experienceLevel: this.selectedExperienceLevel() || 'N/A',
      salary: this.enteredSalary()!,
    };

    this.submitStatus.set('submitting');
    this.errorMessage.set('');

    this.salaryService.submitSalary(salaryData).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        this.submitStatus.set('success');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al enviar el salario:', error);
        this.submitStatus.set('error');
        this.errorMessage.set(error.message || 'El servidor no respondió correctamente. Intenta más tarde.');
      },
    });
  }

  resetForm() {
    this.selectedArea.set(null);
    this.selectedLocation.set(null);
    this.selectedPosition.set(null);
    this.selectedExperienceLevel.set(null);
    this.enteredSalary.set(null);
  }

  private setDefaultFilters() {
    console.log('🔄 [INQUIRY-FORM] Usando datos por defecto');
    this.work_fields.set([
      'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance',
      'Customer Support', 'Product Management', 'Design', 'Operations', 'IT',
    ]);
    this.experience_levels.set(['Junior', 'Semi Senior', 'Senior', 'Executive']);
    this.locations.set(['USA', 'UK', 'Germany', 'Japan', 'Australia', 'Canada', 'Remote']);
    this.positions.set([
      'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
      'Sales Executive', 'Marketing Specialist', 'HR Manager', 'Finance Analyst',
      'Customer Support Representative', 'Operations Coordinator',
    ]);
  }
}