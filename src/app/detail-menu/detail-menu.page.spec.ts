import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMenuPage } from './detail-menu.page';

describe('DetailMenuPage', () => {
  let component: DetailMenuPage;
  let fixture: ComponentFixture<DetailMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
