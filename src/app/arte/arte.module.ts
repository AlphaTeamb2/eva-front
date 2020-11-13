import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SharedModule } from 'primeng/components/common/shared';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {FileUploadModule} from 'primeng/primeng';

import { ArtesRoutingModule } from './artes-routing.module';
import { ArteIndexComponent } from './arte-index/arte-index.component';
import { ArtePesquisaComponent } from './arte-pesquisa/arte-pesquisa.component';
import { NovaComponent } from './nova/nova.component';
import { ArteComponent } from './arte/arte.component';
import { ArteCompraComponent } from './arte-compra/arte-compra.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    FileUploadModule,

    SharedModule,
    ArtesRoutingModule
  ],
  declarations: [ArteIndexComponent, ArtePesquisaComponent, NovaComponent, ArteComponent, ArteCompraComponent],
  exports: [
    ArteIndexComponent,
    ArtePesquisaComponent,
    NovaComponent,
    ArteComponent,
    ArteCompraComponent
  ],
})
export class ArteModule { }
