import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NguiInViewComponent } from './ngui-in-view/ngui-in-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NguiInViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
