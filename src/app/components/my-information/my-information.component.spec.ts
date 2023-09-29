import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInformationComponent } from './my-information.component';

describe('MyInformationComponent', () => {
  let component: MyInformationComponent;
  let fixture: ComponentFixture<MyInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInformationComponent]
    });
    fixture = TestBed.createComponent(MyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
