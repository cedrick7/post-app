import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicturePlaceholderComponent } from './profile-picture-placeholder.component';

describe('ProfilePicturePlaceholderComponent', () => {
  let component: ProfilePicturePlaceholderComponent;
  let fixture: ComponentFixture<ProfilePicturePlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePicturePlaceholderComponent]
    });
    fixture = TestBed.createComponent(ProfilePicturePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
