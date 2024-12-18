import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinioClienteComponent } from './opinio-cliente.component';

describe('OpinioClienteComponent', () => {
  let component: OpinioClienteComponent;
  let fixture: ComponentFixture<OpinioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpinioClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
