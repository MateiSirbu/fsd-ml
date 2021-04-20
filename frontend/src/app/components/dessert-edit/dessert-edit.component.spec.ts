import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertEditComponent } from './dessert-edit.component';

describe('DessertEditComponent', () => {
  let component: DessertEditComponent;
  let fixture: ComponentFixture<DessertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
