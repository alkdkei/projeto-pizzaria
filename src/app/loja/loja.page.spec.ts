import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaPage } from './loja.page';

describe('LojaPage', () => {
  let component: LojaPage;
  let fixture: ComponentFixture<LojaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
