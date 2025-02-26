import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpreviewComponent } from './formpreview.component';

describe('FormpreviewComponent', () => {
  let component: FormpreviewComponent;
  let fixture: ComponentFixture<FormpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormpreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
