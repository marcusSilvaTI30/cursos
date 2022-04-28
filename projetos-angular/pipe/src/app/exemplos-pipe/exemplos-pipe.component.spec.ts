import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplosPipeComponent } from './exemplos-pipe.component';

describe('ExemplosPipeComponent', () => {
  let component: ExemplosPipeComponent;
  let fixture: ComponentFixture<ExemplosPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemplosPipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplosPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
