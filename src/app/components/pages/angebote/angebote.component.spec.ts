import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngeboteComponent } from './angebote.component';

describe('AngeboteComponent', () => {
  let component: AngeboteComponent;
  let fixture: ComponentFixture<AngeboteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngeboteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngeboteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
