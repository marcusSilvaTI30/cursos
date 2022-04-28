import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivasNgifComponent } from './diretivas-ngif.component';

describe('DiretivasNgifComponent', () => {
  let component: DiretivasNgifComponent;
  let fixture: ComponentFixture<DiretivasNgifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiretivasNgifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivasNgifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
