import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSecundariosComponent } from './servicios-secundarios.component';

describe('ServiciosSecundariosComponent', () => {
  let component: ServiciosSecundariosComponent;
  let fixture: ComponentFixture<ServiciosSecundariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosSecundariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosSecundariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
