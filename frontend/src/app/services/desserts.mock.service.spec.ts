import { TestBed } from '@angular/core/testing';

import { DessertMockService } from './desserts.mock.service';

describe('DessertMockService', () => {
    let service: DessertMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DessertMockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
