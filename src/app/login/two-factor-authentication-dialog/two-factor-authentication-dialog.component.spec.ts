import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorAuthenticationDialogComponent } from './two-factor-authentication-dialog.component';

describe('TwoFactorAuthenticationDialogComponent', () => {
  let component: TwoFactorAuthenticationDialogComponent;
  let fixture: ComponentFixture<TwoFactorAuthenticationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFactorAuthenticationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorAuthenticationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
