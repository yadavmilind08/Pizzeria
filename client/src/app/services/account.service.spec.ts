import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { User } from '../models/user';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API and update currentUserSource on successful login', () => {
    const dummyModel = {
      username: 'username',
      password: 'username123',
    };
    const mockResponse: User = {
      username: 'username',
      token: 'token',
    };
    spyOn(localStorage, 'setItem');

    service.login(dummyModel).subscribe();

    const req = httpMock.expectOne(`${service.baseUrl}account/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(mockResponse)
    );
    expect(service['currentUserSource'].value).toEqual(mockResponse);
  });

  it('should call register API and update currentUserSource on successful registration', () => {
    const dummyModel = {
      username: 'username',
      password: 'username123',
    };
    const mockResponse: User = {
      username: 'username',
      token: 'token',
    };
    spyOn(localStorage, 'setItem');

    service.register(dummyModel).subscribe();

    const req = httpMock.expectOne(`${service.baseUrl}account/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(mockResponse)
    );
    expect(service['currentUserSource'].value).toEqual(mockResponse);
  });

  it('should setCurrentUser properly', () => {
    const dummyUser: User = {
      username: 'username',
      token: 'token',
    };

    service.setCurrentUser(dummyUser);

    expect(service['currentUserSource'].value).toEqual(dummyUser);
  });

  it('should remove user from localStorage and set currentUserSource to null on logout', () => {
    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(service['currentUserSource'].value).toBeNull();
  });
});
