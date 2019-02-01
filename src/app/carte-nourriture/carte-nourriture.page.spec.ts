import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteNourriturePage } from './carte-nourriture.page';

describe('CarteNourriturePage', () => {
  let component: CarteNourriturePage;
  let fixture: ComponentFixture<CarteNourriturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteNourriturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteNourriturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
