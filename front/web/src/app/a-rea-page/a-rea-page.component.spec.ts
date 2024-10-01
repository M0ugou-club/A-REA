import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AREAPageComponent } from './a-rea-page.component';

describe('AREAPageComponent', () => {
  let component: AREAPageComponent;
  let fixture: ComponentFixture<AREAPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AREAPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AREAPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
