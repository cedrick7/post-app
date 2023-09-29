import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeInformationComponent } from './me-information.component';

describe('MeInformationComponent', () => {
  let component: MeInformationComponent;
  let fixture: ComponentFixture<MeInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeInformationComponent]
    });
    fixture = TestBed.createComponent(MeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
