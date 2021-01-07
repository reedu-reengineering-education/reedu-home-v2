import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuszeichnungenComponent } from './auszeichnungen.component';

describe('AuszeichnungenComponent', () => {
  let component: AuszeichnungenComponent;
  let fixture: ComponentFixture<AuszeichnungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuszeichnungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuszeichnungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
