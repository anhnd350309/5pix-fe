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
import type { MerchantApprovedStatus } from './merchantApprovedStatus';

export type GetMerchantsGetParams = {
merchant_active_status?: MerchantApprovedStatus;
page_size?: number;
page?: number;
sort_by?: string;
order?: string;
};
