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

/**
 * An enumeration.
 */
export type OrderCategory = typeof OrderCategory[keyof typeof OrderCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const OrderCategory = {
  ORDINARY: 'ORDINARY',
  CREDIT_DEPOSIT: 'CREDIT_DEPOSIT',
  BUY_WHOLE_ALBUM: 'BUY_WHOLE_ALBUM',
} as const;
