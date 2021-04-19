import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsFeedComponent } from './desserts-feed.component';

describe('DessertsFeedComponent', () => {
  let component: DessertsFeedComponent;
  let fixture: ComponentFixture<DessertsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertsFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
