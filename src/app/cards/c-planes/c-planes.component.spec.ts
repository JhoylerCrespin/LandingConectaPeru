import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPlanesComponent } from './c-planes.component';

describe('CPlanesComponent', () => {
  let component: CPlanesComponent;
  let fixture: ComponentFixture<CPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
