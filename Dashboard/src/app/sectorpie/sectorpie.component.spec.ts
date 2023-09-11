import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorpieComponent } from './sectorpie.component';

describe('SectorpieComponent', () => {
  let component: SectorpieComponent;
  let fixture: ComponentFixture<SectorpieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectorpieComponent]
    });
    fixture = TestBed.createComponent(SectorpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
