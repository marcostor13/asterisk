import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTroncalComponent } from './crear-troncal.component';

describe('CrearTroncalComponent', () => {
  let component: CrearTroncalComponent;
  let fixture: ComponentFixture<CrearTroncalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTroncalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTroncalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
