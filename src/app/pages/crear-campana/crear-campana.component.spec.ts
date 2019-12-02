import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCampanaComponent } from './crear-campana.component';

describe('CrearCampanaComponent', () => {
  let component: CrearCampanaComponent;
  let fixture: ComponentFixture<CrearCampanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCampanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
