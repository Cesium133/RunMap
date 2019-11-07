import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawRouteModalPage } from './draw-route-modal.page';

describe('DrawRouteModalPage', () => {
  let component: DrawRouteModalPage;
  let fixture: ComponentFixture<DrawRouteModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawRouteModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawRouteModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
