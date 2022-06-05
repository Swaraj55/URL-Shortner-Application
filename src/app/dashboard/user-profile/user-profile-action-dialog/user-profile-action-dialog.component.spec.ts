import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileActionDialogComponent } from './user-profile-action-dialog.component';

describe('UserProfileActionDialogComponent', () => {
  let component: UserProfileActionDialogComponent;
  let fixture: ComponentFixture<UserProfileActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileActionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
