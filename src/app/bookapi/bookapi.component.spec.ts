import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookapiComponent } from './bookapi.component';

describe('BookapiComponent', () => {
  let component: BookapiComponent;
  let fixture: ComponentFixture<BookapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
