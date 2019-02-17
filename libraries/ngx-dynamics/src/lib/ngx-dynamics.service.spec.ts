import { TestBed } from '@angular/core/testing';

import { NgxDynamicsService } from './ngx-dynamics.service';

describe('NgxDynamicsService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: NgxDynamicsService = TestBed.get(NgxDynamicsService);
		expect(service).toBeTruthy();
	});
});
