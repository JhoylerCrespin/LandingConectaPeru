import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecContactarComponent } from './sec-contactar.component';

describe('SecContactarComponent', () => {
  let component: SecContactarComponent;
  let fixture: ComponentFixture<SecContactarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecContactarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecContactarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
