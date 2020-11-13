import { Component, OnInit } from '@angular/core';
import { ArteService, ArteFiltro } from '../arte.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { Arte } from 'app/core/model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-nova',
  templateUrl: './nova.component.html',
  styleUrls: ['./nova.component.css']
})
export class NovaComponent implements OnInit {

  tipos = [
    {label: 'Fotografia', value: 'Fotografia'},
    {label: 'Desenho', value: 'Desenho'},
    {label: 'Quadro', value: 'Quadro'},
    {label: 'Escultura', value: 'Escultura'}
  ]

  artes = new Arte();
  imagem = [];


  constructor(
    private arteService: ArteService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private http: Http
  ) { }

  ngOnInit() {
    const codigoArte = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Arte');

    if (codigoArte) {
      this.atualizarTituloEdicao()
      this.carregarArte(codigoArte);
    }
  }
  get editando() {
    return Boolean(this.artes.idArte)
  }

  inputFileChange(event) {
    return this.arteService.inputFileChange(event)

  }

  onChange(event) {
    console.log(event)
    const selectedFiles = <FileList>event.srcElement.files
    document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name
  }

  carregarArte(codigo: number) {
    this.arteService.buscarPorCodigo(codigo)
      .then(artes => {
        this.artes = artes;

      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    adicionarArte(form: FormControl) {
      this.arteService.adicionar(this.artes)
        .then(arteAdicionada => {
          this.toasty.success('Arte adicionada com sucesso!');
          // form.reset();
          // this.lancamento = new Lancamento();
          this.router.navigate(['/artes', arteAdicionada.idArte]);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    atualizarArte(form: FormControl) {
      this.arteService.atualizar(this.artes)
        .then(artes => {
          this.artes = artes;

          this.toasty.success('Arte alterada com sucesso!');
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    salvar(form: FormControl) {
      if (this.editando) {
        this.atualizarArte(form);
      } else {
        this.adicionarArte(form);
      }
    }
    novo(form: FormControl) {
      form.reset();

      setTimeout(function() {
        this.arte = new Arte();
      }.bind(this), 1);

      this.router.navigate(['/artes/nova']);
    }
    atualizarTituloEdicao() {
      this.title.setTitle(`Edição de lançamento`);
    }

}
