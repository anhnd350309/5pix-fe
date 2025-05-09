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
import type {
  ResponseSchemaBase
} from '../../schemas'

export const getGetHealthcheckGetResponseMock = (overrideResponse: Partial< ResponseSchemaBase > = {}): ResponseSchemaBase => ({code: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), message: faker.helpers.arrayElement([faker.string.alpha(20), undefined]), ...overrideResponse})


export const getGetHealthcheckGetMockHandler = (overrideResponse?: ResponseSchemaBase | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ResponseSchemaBase> | ResponseSchemaBase)) => {
  return http.get('*/healthcheck', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetHealthcheckGetResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}
export const getHealthCheckMock = () => [
  getGetHealthcheckGetMockHandler()
]
