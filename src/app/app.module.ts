import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Route } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDynamicsModule } from 'libraries/ngx-dynamics/src/public_api';

const callback = (response: any): Routes => {
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
		NgxDynamicsModule.forRoot({
			appConfigSource: {
				url: '/assets/mocks/router.json',
				method: 'GET'
			},
			enableServices: {
				router: true
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
