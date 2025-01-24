import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmodictComponent } from './emodict.component';

describe('EmodictComponent', () => {
  let component: EmodictComponent;
  let fixture: ComponentFixture<EmodictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmodictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmodictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
