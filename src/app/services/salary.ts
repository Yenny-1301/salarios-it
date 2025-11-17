import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalaryFormData {
  area: string;
  location: string;
  position: string;
  experienceLevel: string;
  salary: number;
}

export interface FilterOptions {
  areas: string[];
  positions: string[];
  experienceLevels: string[];
  locations: string[];
}

// ✅ NUEVA INTERFAZ para el promedio
export interface AverageSalaryResponse {
  averageSalary: number;
  sampleSize: number;
  currency: string;
  filters: {
    jobTitle: string | null;
    location: string | null;
    experienceLevel: string | null;
  }
}

export interface AverageSalaryRequest {
  area?: string | null;
  location?: string | null;
  experienceLevel?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Obtener opciones de filtro desde el backend
  getFilterOptions(): Observable<FilterOptions> {
    const url = `${this.apiUrl}/salaries/filters`;
    console.log('📡 [SERVICE] Realizando HTTP GET a:', url);
    return this.http.get<FilterOptions>(url);
  }

  // ✅ NUEVO MÉTODO: Calcular salario promedio
  getAverageSalary(filters: AverageSalaryRequest): Observable<AverageSalaryResponse> {
    const url = `${this.apiUrl}/salaries/average-salary`;
    console.log('📡 [SERVICE] Calculando promedio con filtros:', filters);
    return this.http.post<AverageSalaryResponse>(url, filters);
  }

  // Enviar datos del formulario de salario
  submitSalary(salaryData: SalaryFormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salaries/`, salaryData);
  }

  // Obtener todos los salarios
  getSalaries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/salaries`);
  }

  // Obtener un salario por ID
  getSalary(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/salaries/${id}`);
  }

  // Los métodos de employment types se mantienen si los necesitas
  getEmploymentTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employmentTypes`);
  }

  getEmploymentType(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employmentTypes/${id}`);
  }
}