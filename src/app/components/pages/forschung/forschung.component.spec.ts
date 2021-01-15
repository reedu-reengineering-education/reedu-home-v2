import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForschungComponent } from './forschung.component';

describe('ForschungComponent', () => {
  let component: ForschungComponent;
  let fixture: ComponentFixture<ForschungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForschungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForschungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
