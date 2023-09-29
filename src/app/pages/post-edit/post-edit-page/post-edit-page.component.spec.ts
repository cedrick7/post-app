import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditPageComponent } from './post-edit-page.component';

describe('PostEditPageComponent', () => {
  let component: PostEditPageComponent;
  let fixture: ComponentFixture<PostEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostEditPageComponent]
    });
    fixture = TestBed.createComponent(PostEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
