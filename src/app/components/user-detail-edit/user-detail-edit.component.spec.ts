import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailEditComponent } from './user-detail-edit.component';

describe('UserDetailEditComponent', () => {
  let component: UserDetailEditComponent;
  let fixture: ComponentFixture<UserDetailEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailEditComponent]
    });
    fixture = TestBed.createComponent(UserDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
