import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { User } from '../models/user';
import { CreateOrder, Order } from '../models/order';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getOrdersByUsername API with the correct URL', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(dummyUser));
    const expectedUrl = `${service.baseUrl}order/${dummyUser.username}`;

    service.getOrdersByUsername()?.subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
  });

  it('should return orders by username', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(dummyUser));
    const mockOrders: Order[] = [{}] as any;
    const expectedUrl = `${service.baseUrl}order/${dummyUser.username}`;

    service.getOrdersByUsername()?.subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should call createOrder API with the correct URL', () => {
    const dummyOrder: CreateOrder = {} as any;
    const expectedUrl = `${service.baseUrl}order`;

    service.createOrder(dummyOrder).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
  });

  it('should create order', () => {
    const dummyOrder: CreateOrder = {} as any;
    const mockResponse = true;
    const expectedUrl = `${service.baseUrl}order`;

    // Act
    service.createOrder(dummyOrder).subscribe((response) => {
      // Assert
      expect(response).toEqual(mockResponse);
    });

    // Assert
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});

const dummyUser: User = { username: 'testuser', token: 'token' };
