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
import type { ImageQueryDTO } from './imageQueryDTO';

export interface CreateOrderRequest {
  album_id?: number;
  collection_id?: number;
  credit_amount?: number;
  image_queries?: ImageQueryDTO[];
  note?: string;
  payment_information?: string;
}
