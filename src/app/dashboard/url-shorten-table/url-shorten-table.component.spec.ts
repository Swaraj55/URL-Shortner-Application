import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShortenTableComponent } from './url-shorten-table.component';

describe('UrlShortenTableComponent', () => {
  let component: UrlShortenTableComponent;
  let fixture: ComponentFixture<UrlShortenTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlShortenTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlShortenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
