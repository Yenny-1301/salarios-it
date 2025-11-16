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
export class SalaryForm implements OnInit {
  private salaryService = inject(SalaryService);

  // Signals para los valores del formulario
  selectedArea = signal<string | null>(null);
  selectedLocation = signal<string | null>(null);
  selectedPosition = signal<string | null>(null);
  selectedExperienceLevel = signal<string | null>(null);
  enteredSalary = signal<number | null>(null);

  // Signals para las opciones del formulario (ahora se cargan desde el backend)
  work_fields = signal<string[]>([]);
  experience_levels = signal<string[]>([]);
  locations = signal<string[]>([]);
  positions = signal<string[]>([]);

  // Estado de carga
  isLoading = signal(false);

  ngOnInit() {
    console.log('🔍 [DEBUG] Iniciando diagnóstico de conexión...');
    
    // 1. Verificar que el servicio esté disponible
    console.log('✅ Servicio inyectado:', this.salaryService);
    
    // 2. Probar la conexión manualmente
    this.testBackendConnection();
  }

  // 🔍 MÉTODO NUEVO: Diagnóstico de conexión
  private testBackendConnection() {
    const testUrl = 'http://localhost:5000/api/salaries/filters';
    console.log('🧪 [TEST] Probando conexión directa a:', testUrl);
    
    fetch(testUrl)
      .then(response => {
        console.log('✅ [TEST] Respuesta HTTP recibida. Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('📊 [TEST] Datos recibidos del backend:', data);
        console.log('🎯 [TEST] Conexión exitosa! Cargando filtros...');
        // Si funciona, entonces cargar los filtros normalmente
        this.loadFilterOptions();
      })
      .catch(error => {
        console.error('❌ [TEST] Error de conexión:', error);
        console.log('💡 [SOLUCIÓN] Usando datos por defecto');
        this.setDefaultFilters();
      });
  }

  // Cargar opciones de filtro desde el backend
  loadFilterOptions() {
    console.log('🔄 [COMPONENT] loadFilterOptions ejecutado');
    this.salaryService.getFilterOptions().subscribe({
      next: (filters: FilterOptions) => {
        console.log('✅ [COMPONENT] CONEXIÓN EXITOSA - Filtros:', filters);
        console.log('📊 Filtros cargados:', {
          areas: filters.areas?.length,
          locations: filters.locations?.length,
          positions: filters.positions?.length,
          experienceLevels: filters.experienceLevels?.length
        });
        this.work_fields.set(filters.areas);
        this.experience_levels.set(filters.experienceLevels);
        this.locations.set(filters.locations);
        this.positions.set(filters.positions);
      },
      error: (error) => {
        console.error('❌ [COMPONENT] ERROR de conexión:', error);
        console.log('🔍 Detalles del error:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        this.setDefaultFilters();
      }
    });
  }

  // Valores por defecto en caso de error
  private setDefaultFilters() {
    console.log('🔄 Usando datos por defecto');
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

  submitForm() {
    // Validaciones
    if (!this.selectedArea() || !this.selectedLocation() ||
      !this.selectedPosition() || !this.selectedExperienceLevel() ||
      !this.enteredSalary()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.enteredSalary()! <= 0) {
      alert('Por favor, ingresa un salario válido');
      return;
    }

    const formData: SalaryFormData = {
      area: this.selectedArea()!,
      location: this.selectedLocation()!,
      position: this.selectedPosition()!,
      experienceLevel: this.selectedExperienceLevel()!,
      salary: this.enteredSalary()!
    };

    console.log('Enviando datos al backend...', formData);
    this.isLoading.set(true);

    // Usar el servicio para enviar los datos
    this.salaryService.submitSalary(formData).subscribe({
      next: (response) => {
        console.log('✅ Éxito:', response);
        this.isLoading.set(false);

        alert(response.message || '¡Salario registrado exitosamente!');
        this.clearForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error:', error);
        this.isLoading.set(false);

        let errorMessage = 'Error al enviar los datos';
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor. Verifica que el backend esté corriendo.';
        } else if (error.status === 400) {
          errorMessage = `Datos inválidos: ${error.error.missing_fields?.join(', ') || error.error.message}`;
        }

        alert(errorMessage);
      }
    });
  }

  // Limpiar el formulario
  clearForm() {
    this.selectedArea.set(null);
    this.selectedLocation.set(null);
    this.selectedPosition.set(null);
    this.selectedExperienceLevel.set(null);
    this.enteredSalary.set(null);

    // También puedes resetear los selects del DOM
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.selectedIndex = 0;
    });
  }
}