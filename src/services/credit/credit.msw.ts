/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * 5PIX BACKEND
 * 
        Base frame with FastAPI micro framework + Postgresql
            - Login/Register with JWT
            - Permission
            - CRUD User
            - Unit testing with Pytest
            - Dockerize
        
 * OpenAPI spec version: 0.1.0
 */
import {
  faker
} from '@faker-js/faker'
import {
  HttpResponse,
  delay,
  http
} from 'msw'
import {
  CreditLogCategory
} from '../../schemas'
import type {
  CreditWalletResponse,
  PageCreditLogResponse
} from '../../schemas'

export const getGetCreditGetResponseMock = (overrideResponse: Partial< PageCreditLogResponse > = {}): PageCreditLogResponse => ({code: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), data: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({credit_amount: faker.number.int({min: undefined, max: undefined}), note: faker.string.alpha(20), operation: faker.helpers.arrayElement(Object.values(CreditLogCategory)), requester: faker.string.alpha(20)})), message: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), metadata: {current_page: faker.number.int({min: undefined, max: undefined}), page_size: faker.number.int({min: undefined, max: undefined}), total_items: faker.number.int({min: undefined, max: undefined})}, ...overrideResponse})

export const getUpdateCreditCreditAdminUpdateCreditPutResponseMock = (overrideResponse: Partial< CreditWalletResponse > = {}): CreditWalletResponse => ({credit_balance: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined]), owner: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined]), ...overrideResponse})


export const getGetCreditGetMockHandler = (overrideResponse?: PageCreditLogResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<PageCreditLogResponse> | PageCreditLogResponse)) => {
  return http.get('*/credit', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetCreditGetResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getUpdateCreditCreditAdminUpdateCreditPutMockHandler = (overrideResponse?: CreditWalletResponse | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<CreditWalletResponse> | CreditWalletResponse)) => {
  return http.put('*/credit/admin/update-credit', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getUpdateCreditCreditAdminUpdateCreditPutResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getCreditMock = () => [
  getGetCreditGetMockHandler(),
  getUpdateCreditCreditAdminUpdateCreditPutMockHandler()
]
