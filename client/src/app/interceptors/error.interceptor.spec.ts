import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorInterceptor } from './error.interceptor';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

class MockHttpHandler extends HttpHandler {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of();
  }
}

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let router: Router;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        ErrorInterceptor,
        ToastrService,
        { provide: HttpHandler, useClass: MockHttpHandler },
      ],
    });

    interceptor = TestBed.inject(ErrorInterceptor);
    router = TestBed.inject(Router);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle 400 error', inject(
    [HttpHandler],
    (httpHandler: HttpHandler) => {
      const errorResponse = new HttpErrorResponse({
        status: 400,
        error: { errors: { key1: ['error1', 'error2'] } },
      });
      const handleSpy = spyOn(httpHandler, 'handle').and.returnValue(
        throwError(errorResponse)
      );
      const toastrErrorSpy = spyOn(toastrService, 'error');

      interceptor
        .intercept(new HttpRequest<any>('GET', '/api/test'), httpHandler)
        .subscribe(
          () => {},
          (error) => {
            expect(error).toEqual(['error1', 'error2']);
            expect(toastrErrorSpy).not.toHaveBeenCalled();
          }
        );
    }
  ));

  it('should handle 401 error', inject(
    [HttpHandler],
    (httpHandler: HttpHandler) => {
      const errorResponse = new HttpErrorResponse({ status: 401 });
      spyOn(httpHandler, 'handle').and.returnValue(throwError(errorResponse));
      const toastrErrorSpy = spyOn(toastrService, 'error');

      interceptor
        .intercept(new HttpRequest<any>('GET', '/api/test'), httpHandler)
        .subscribe(
          () => {},
          (error) => {
            expect(error).toBe(errorResponse);
            expect(toastrErrorSpy).toHaveBeenCalledWith('Unauthorized', '401');
          }
        );
    }
  ));
});
