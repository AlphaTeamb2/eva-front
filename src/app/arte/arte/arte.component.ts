import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { ArteService } from 'app/arte/arte.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Arte } from 'app/core/model';

@Component({
  selector: 'app-arte',
  templateUrl: './arte.component.html',
  styleUrls: ['./arte.component.css']
})
export class ArteComponent implements OnInit{

  artes = new Arte();

  constructor(
    private arteService: ArteService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,

    private title: Title,
  ) { }

  ngOnInit() {
    const codigoArte = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Arte');

    if (codigoArte) {
      this.atualizarTitulo()
      this.carregarArte(codigoArte);
    }
  }

  carregarArte(codigo: number) {
    this.arteService.buscarPorCodigo(codigo)
      .then(artes => {
        this.artes = artes;

      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    atualizarTitulo() {
      this.title.setTitle('Arte');
    }
}
