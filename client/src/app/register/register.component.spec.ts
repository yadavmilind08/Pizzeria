import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AccountService } from '../services/account.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountService: AccountService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [AccountService, ToastrService],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    toastrService = TestBed.inject(ToastrService);
    spyOn(toastrService, 'error');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call accountService.register when register method is called', () => {
    const dummyModel = {
      username: 'username',
      password: 'username123',
    };
    spyOn(accountService, 'register').and.returnValue(of(null as any));

    component.model = dummyModel;
    component.register();

    expect(accountService.register).toHaveBeenCalledWith(dummyModel);
  });

  it('should emit false when cancel method is called', () => {
    spyOn(component.cancelRegister, 'emit');

    component.cancel();

    expect(component.cancelRegister.emit).toHaveBeenCalledWith(false);
  });

  it('should show error message when registration fails', () => {
    const errorMessage = 'Registration failed';
    spyOn(accountService, 'register').and.returnValue(
      throwError({ error: errorMessage })
    );

    component.register();

    expect(toastrService.error).toHaveBeenCalledWith(errorMessage);
  });
});
