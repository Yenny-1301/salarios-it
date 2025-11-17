import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sadministrator',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './Administrator.html',
    styleUrls: ['./Administrator.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministratorComponent {
    areas: string[] = [
        'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance',
        'Customer Support', 'Product Management', 'Design', 'Operations', 'IT'
    ];

    locations: string[] = [
        'USA', 'UK', 'Germany', 'Japan', 'Australia', 'Canada', 'Remote'
    ];

    positions: string[] = [
        'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
        'Sales Executive', 'Marketing Specialist', 'HR Manager', 'Finance Analyst',
        'Customer Support Representative', 'Operations Coordinator'
    ];

    experienceLevels: string[] = [
        'Junior', 'Semi Senior', 'Senior', 'Executive'
    ];

    nuevoSalario = {
        area: '',
        location: '',
        position: '',
        experienceLevel: '',
        salary: 0
    };

    salarios: any[] = [];
    mostrarError: boolean = false;
    mostrarMensajeInicial: boolean = true;
    currentPage = 1;
    itemsPerPage = 5;

    ocultarMensaje(): void {
        if (this.mostrarMensajeInicial) {
            this.mostrarMensajeInicial = false;
        }
    }

    get paginatedSalarios(): any[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.salarios.slice(start, start + this.itemsPerPage);
    }

    get totalPages(): number {
        return Math.ceil(this.salarios.length / this.itemsPerPage);
    }

    guardar(): void {
        if (
            !this.nuevoSalario.area.trim() ||
            !this.nuevoSalario.location.trim() ||
            !this.nuevoSalario.position.trim() ||
            !this.nuevoSalario.experienceLevel.trim() ||
            this.nuevoSalario.salary <= 0
        ) {
            this.mostrarError = true;
            return;
        }

        this.mostrarError = false;

        this.salarios.push({ ...this.nuevoSalario });
        this.nuevoSalario = {
            area: '',
            location: '',
            position: '',
            experienceLevel: '',
            salary: 0
        };
        this.currentPage = this.totalPages;
    }

    editar(index: number): void {
        const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
        this.nuevoSalario = { ...this.salarios[globalIndex] };
        this.salarios.splice(globalIndex, 1);
    }

    borrar(index: number): void {
        const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
        this.salarios.splice(globalIndex, 1);
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
        }
    }

    detalle(index: number): void {
        const salario = this.paginatedSalarios[index];
        alert(`Detalle del Salario:
Área: ${salario.area}
Locación: ${salario.location}
Puesto: ${salario.position}
Nivel de experiencia: ${salario.experienceLevel}
Salario: $${salario.salary}`);
    }

    cambiarPagina(pagina: number): void {
        if (pagina >= 1 && pagina <= this.totalPages) {
            this.currentPage = pagina;
        }
    }
}
