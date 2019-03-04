import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FilterByNamePipe} from './filters/FilterByName'
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterByNamePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    FilterByNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
