import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNourriturePage } from './edit-nourriture.page';

describe('EditNourriturePage', () => {
  let component: EditNourriturePage;
  let fixture: ComponentFixture<EditNourriturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNourriturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNourriturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
