import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCommandePage } from './historique-commande.page';

describe('HistoriqueCommandePage', () => {
  let component: HistoriqueCommandePage;
  let fixture: ComponentFixture<HistoriqueCommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueCommandePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
