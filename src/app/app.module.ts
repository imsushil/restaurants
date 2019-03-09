import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FilterByNamePipe} from './filters/FilterByName'
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {OrderByPipe} from './filters/SortByProperty';
import {SearchInCuisinePipe} from './filters/SearchCuisine'
import {FilterByCuisinePipe} from './filters/FilterByCuisine'
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterByNamePipe,
    OrderByPipe,
    SearchInCuisinePipe,
    FilterByCuisinePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    FilterByNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
