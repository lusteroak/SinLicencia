import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarHeader } from './search-bar-header';

describe('SearchBarHeader', () => {
  let component: SearchBarHeader;
  let fixture: ComponentFixture<SearchBarHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
