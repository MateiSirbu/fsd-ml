import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertDeleteComponent } from './dessert-delete.component';

describe('DessertDeleteComponent', () => {
  let component: DessertDeleteComponent;
  let fixture: ComponentFixture<DessertDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
