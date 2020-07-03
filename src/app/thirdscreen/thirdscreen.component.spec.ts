import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdscreenComponent } from './thirdscreen.component';

describe('ThirdscreenComponent', () => {
  let component: ThirdscreenComponent;
  let fixture: ComponentFixture<ThirdscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
