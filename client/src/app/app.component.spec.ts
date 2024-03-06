import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { User } from './models/user';
import { NavComponent } from './nav/nav.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let accountService: jasmine.SpyObj<AccountService>;

  beforeEach(async () => {
    const accountServiceSpy = jasmine.createSpyObj('AccountService', [
      'setCurrentUser',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavComponent],
      imports: [RouterModule, FormsModule],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { id: '123', name: 'example' } },
          },
        },
      ],
    }).compileComponents();

    accountService = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setCurrentUser method on initialization if user is available in localStorage', () => {
    const dummyUser: User = {
      username: 'username',
      token: 'token',
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(dummyUser));

    fixture.detectChanges();

    expect(accountService.setCurrentUser).toHaveBeenCalledWith(dummyUser);
  });

  it('should not call setCurrentUser method on initialization if user is not available in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    fixture.detectChanges();

    expect(accountService.setCurrentUser).not.toHaveBeenCalled();
  });
});
