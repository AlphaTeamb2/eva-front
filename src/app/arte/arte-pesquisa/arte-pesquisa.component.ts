import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';


import { ArteService, ArteFiltro } from './../arte.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';


@Component({
  selector: 'app-arte-pesquisa',
  templateUrl: './arte-pesquisa.component.html',
  styleUrls: ['./arte-pesquisa.component.css']
})
export class ArtePesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ArteFiltro();
  arte = [];

  constructor(
    private arteService: ArteService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title,
    private http: Http,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Catálogo de Artes');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.arteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.arte = resultado.artes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // aoMudarPagina(event: LazyLoadEvent) {
  //   const pagina = event.first / event.rows;
  //   this.pesquisar();
  // }

  // confirmarExclusao(arte: any) {
  //   this.confirmation.confirm({
  //     message: 'Tem certeza que deseja excluir?',
  //     accept: () => {
  //       this.excluir(arte);
  //     }
  //   });
  // }

  excluir(arte: any) {
    this.arteService.excluir(arte)
      .then(() => {
          this.pesquisar()
        this.toasty.success('Arte excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
