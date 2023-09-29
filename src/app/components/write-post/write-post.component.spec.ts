import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePostComponent } from './write-post.component';

describe('WritePostComponent', () => {
  let component: WritePostComponent;
  let fixture: ComponentFixture<WritePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WritePostComponent]
    });
    fixture = TestBed.createComponent(WritePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
