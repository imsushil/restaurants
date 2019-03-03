import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FilterByNamePipe} from './filters/FilterByName'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterByNamePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FilterByNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
