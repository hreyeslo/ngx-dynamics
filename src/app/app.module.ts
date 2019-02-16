import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Route } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from 'libraries/router/src/public_api';

const callback = (response: any) => {
  console.log(response);
  return [
    {
      path: 'test',
      loadChildren: 'test#tst'
    }
  ];
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot<any>({
      httpRequest: {
        url: '/assets/mocks/router.json',
        method: 'GET'
      },
      callback
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
