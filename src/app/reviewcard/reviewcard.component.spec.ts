import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewcardComponent } from './reviewcard.component';

describe('ReviewcardComponent', () => {
  let component: ReviewcardComponent;
  let fixture: ComponentFixture<ReviewcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
