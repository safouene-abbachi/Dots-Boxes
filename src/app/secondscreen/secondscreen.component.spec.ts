import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondscreenComponent } from './secondscreen.component';

describe('SecondscreenComponent', () => {
  let component: SecondscreenComponent;
  let fixture: ComponentFixture<SecondscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
