import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DxNumberBoxModule, DxRangeSliderModule} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DxRangeSliderModule,
    DxNumberBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
