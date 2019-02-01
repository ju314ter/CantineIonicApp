import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNourriturePage } from './add-nourriture.page';

describe('AddNourriturePage', () => {
  let component: AddNourriturePage;
  let fixture: ComponentFixture<AddNourriturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNourriturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNourriturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
