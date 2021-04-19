import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsAddComponent } from './desserts-add.component';

describe('DessertsAddComponent', () => {
  let component: DessertsAddComponent;
  let fixture: ComponentFixture<DessertsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
