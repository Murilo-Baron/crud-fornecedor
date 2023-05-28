import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Supplier {
  id: number;
  name: string;
  active: boolean;
  category: string;
  contact: string;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplier: Supplier = {
    id: 0,
    name: '',
    active: false,
    category: 'regional',
    contact: ''
  };

  suppliers: Supplier[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers() {
    this.http.get<any>('http://localhost:3000/suppliers').subscribe(data => {
      this.suppliers = data;
    });
  }

  onSubmit() {
    if (this.supplier.id === 0) {
      this.http.post<any>('http://localhost:3000/suppliers', this.supplier).subscribe(() => {
        this.resetForm();
        this.getSuppliers();
      });
    } else {
      this.http.put<any>(`http://localhost:3000/suppliers/${this.supplier.id}`, this.supplier).subscribe(() => {
        this.resetForm();
        this.getSuppliers();
      });
    }
  }

  editSupplier(supplier: Supplier) {
    this.supplier = { ...supplier };
  }

  deleteSupplier(supplier: Supplier) {
    if (confirm('Tem certeza que deseja excluir o fornecedor?')) {
      this.http.delete<any>(`http://localhost:3000/suppliers/${supplier.id}`).subscribe(() => {
        this.getSuppliers();
      });
    }
  }

  resetForm() {
    this.supplier = {
      id: 0,
      name: '',
      active: false,
      category: 'regional',
      contact: ''
    };
  }
}
