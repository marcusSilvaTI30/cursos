import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPrimeiroComponent2Component } from './meu-primeiro-component2.component';

describe('MeuPrimeiroComponent2Component', () => {
  let component: MeuPrimeiroComponent2Component;
  let fixture: ComponentFixture<MeuPrimeiroComponent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuPrimeiroComponent2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPrimeiroComponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
