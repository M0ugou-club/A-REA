import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenWarningComponent } from './full-screen-warning.component';

describe('FullScreenWarningComponent', () => {
  let component: FullScreenWarningComponent;
  let fixture: ComponentFixture<FullScreenWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullScreenWarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullScreenWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
