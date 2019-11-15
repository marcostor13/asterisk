import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroncalesComponent } from './troncales.component';

describe('TroncalesComponent', () => {
  let component: TroncalesComponent;
  let fixture: ComponentFixture<TroncalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroncalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroncalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
