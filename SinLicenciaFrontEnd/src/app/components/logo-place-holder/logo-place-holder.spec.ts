import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPlaceHolder } from './logo-place-holder';

describe('LogoPlaceHolder', () => {
  let component: LogoPlaceHolder;
  let fixture: ComponentFixture<LogoPlaceHolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoPlaceHolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoPlaceHolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
