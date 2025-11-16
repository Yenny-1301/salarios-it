import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SalaryService, FilterOptions, AverageSalaryRequest, AverageSalaryResponse } from '../../services/salary';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-form.html',
  styleUrl: './inquiry-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InquiryForm implements OnInit {
  private salaryService = inject(SalaryService);

  // ✅ OUTPUTS para comunicarse con el componente padre
  salaryCalculated = output<number>();
  calculationStarted = output<void>();

  // Signals para los valores del formulario
  selectedArea = signal<string | null>(null);
  selectedLocation = signal<string | null>(null);
  selectedPosition = signal<string | null>(null);
  selectedExperienceLevel = signal<string | null>(null);

  // Signals para las opciones del formulario
  work_fields = signal<string[]>([]);
  experience_levels = signal<string[]>([]);
  locations = signal<string[]>([]);
  positions = signal<string[]>([]);

  ngOnInit() {
    console.log('🔍 [INQUIRY-FORM] Cargando filtros...');
    this.loadFilterOptions();
  }

  // Cargar opciones de filtro desde el backend
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

  // Valores por defecto en caso de error
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

  // ✅ MÉTODO ACTUALIZADO: Se ejecuta cuando cambia cualquier selección
  onSelectionChange() {
    // Solo calcular si hay al menos un filtro seleccionado
    if (this.selectedArea() || this.selectedLocation() || this.selectedExperienceLevel()) {
      this.calculateAverageSalary();
    } else {
      // Si no hay filtros, limpiar el resultado
      this.salaryCalculated.emit(0);
    }
  }

  // ✅ MÉTODO CORREGIDO - SOLO UNO
  private calculateAverageSalary() {
    console.log('🧮 [INQUIRY-FORM] Calculando promedio...');

    // Emitir que empezó el cálculo
    this.calculationStarted.emit();

    const filters: AverageSalaryRequest = {
      area: this.selectedArea(),
      location: this.selectedLocation(),
      experienceLevel: this.selectedExperienceLevel()
    };

    // ✅ DEBUG: Ver qué se está enviando
    console.log('🔍 FILTROS ENVIADOS AL BACKEND:', JSON.stringify(filters, null, 2));
    console.log('🔍 Valores individuales:', {
      area: this.selectedArea(),
      location: this.selectedLocation(),
      experienceLevel: this.selectedExperienceLevel()
    });

    // Llamar al servicio para calcular el promedio
    this.salaryService.getAverageSalary(filters).subscribe({
      next: (result: AverageSalaryResponse) => {
        console.log('✅ RESPUESTA COMPLETA del backend:', result);
        console.log('✅ Promedio calculado:', result.averageSalary);
        // Emitir el resultado al componente padre
        this.salaryCalculated.emit(result.averageSalary);
      },
      error: (error: any) => {
        console.error('❌ Error calculando promedio:', error);
        console.error('❌ Detalles del error:', error.message);
        // En caso de error, emitir 0
        this.salaryCalculated.emit(0);
      }
    });
  }

  // Limpiar el formulario
  clearForm() {
    this.selectedArea.set(null);
    this.selectedLocation.set(null);
    this.selectedPosition.set(null);
    this.selectedExperienceLevel.set(null);

    // Resetear los selects del DOM
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.selectedIndex = 0;
    });

    // Emitir 0 para limpiar el promedio
    this.salaryCalculated.emit(0);
  }
}