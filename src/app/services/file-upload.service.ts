import { formatCurrency } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePicture(
    file: File,
    type: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {
    try {
      const url = `${ base_url }/upload/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', file);

      const res = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json()

      console.log(data);

      return 'nombre de la imagen';

    } catch(error) {
      console.log(error);
      return false;
    }
  }
}
