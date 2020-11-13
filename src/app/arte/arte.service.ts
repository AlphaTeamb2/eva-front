import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Arte } from './../core/model'

export class ArteFiltro {
  idArte: number;
  nome: string;
  data: Date;
  valor: number;
  imagem: string;
  pagina = 0;
}

@Injectable()
export class ArteService {

  artesUrl: string;

  constructor(private http: AuthHttp) {
    this.artesUrl = `${environment.apiUrl}/artes`

   }

  pesquisar(filtro: ArteFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
   // params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.artesUrl}`,
    { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const artes = responseJson.content;

        const resultado = {
          artes,
          total: responseJson.totalElements
        };
        console.log(response.json())
        return resultado;
      })

  }

  // excluir(codigo: number): Promise<void> {
  //   const headers = new Headers();
  //   headers.append('Authorization', 'Basic bWFzdGVyQGV2YS5jb206YWRtaW4=');

  //   return this.http.delete(`${this.artesUrl}/${codigo}`, { headers })
  //     .toPromise()
  //     .then(() => null);
  // }
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.artesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(arte: Arte): Promise<Arte> {
    return this.http.post(this.artesUrl,
        JSON.stringify(arte))
      .toPromise()
      .then(response => response.json());

    }

    inputFileChange(event) {
      if (event.target.files && event.target.files[0]) {
        const foto = event.target.files[0];

        const formData = new FormData();
        const headers = new Headers();

        headers.append('Authorization', 'Basic ZXZhOjN2NDA=');
        formData.append('foto', foto);

        this.http.post('https://eva-projectapi.herokuapp.com/artes/fotos', formData)
        .subscribe(resposta =>
          console.log(foto, event, 'Upload ok.'));
      }
    }


  atualizar(arte: Arte): Promise<Arte> {
    return this.http.put(`${this.artesUrl}/${arte.idArte}`,
        JSON.stringify(arte))
      .toPromise()
      .then(response => {
        const arteAlterada = response.json() as Arte;

        this.converterStringsParaDatas([arteAlterada]);

        return arteAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Arte> {
    return this.http.get(`${this.artesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const arte = response.json() as Arte;

        this.converterStringsParaDatas([arte]);

        return arte;
      });
  }

  private converterStringsParaDatas(artes: Arte[]) {
    for (const arte of artes) {
      arte.data = moment(arte.data,
        'YYYY-MM-DD').toDate();
    }
  }
}
