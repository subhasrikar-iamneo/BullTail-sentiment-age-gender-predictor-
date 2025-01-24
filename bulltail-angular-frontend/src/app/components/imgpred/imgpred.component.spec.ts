import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgpredComponent } from './imgpred.component';

describe('ImgpredComponent', () => {
  let component: ImgpredComponent;
  let fixture: ComponentFixture<ImgpredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgpredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgpredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
