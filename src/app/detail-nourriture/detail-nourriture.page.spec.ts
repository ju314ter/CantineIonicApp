import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNourriturePage } from './detail-nourriture.page';

describe('DetailNourriturePage', () => {
  let component: DetailNourriturePage;
  let fixture: ComponentFixture<DetailNourriturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNourriturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailNourriturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
