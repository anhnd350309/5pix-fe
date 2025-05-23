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
import type { MerchantType } from './merchantType';
import type { MerchantYearsOfExperience } from './merchantYearsOfExperience';

export interface MerchantUpdateRequest {
  address?: string;
  date_of_birth?: string;
  email?: string;
  events_attended?: string;
  full_name?: string;
  merchant_type?: MerchantType;
  phone_number?: string;
  sample_photo_link?: string;
  social_media_link?: string;
  years_of_experience?: MerchantYearsOfExperience;
}
