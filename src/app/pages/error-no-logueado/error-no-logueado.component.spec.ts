import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNoLogueadoComponent } from './error-no-logueado.component';

describe('ErrorNoLogueadoComponent', () => {
  let component: ErrorNoLogueadoComponent;
  let fixture: ComponentFixture<ErrorNoLogueadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorNoLogueadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNoLogueadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
