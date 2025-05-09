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
import type { AlbumImageIndexStatus } from './albumImageIndexStatus';

export interface OwnedImageResponse {
  album_id: number;
  album_image_id: number;
  album_image_index_status?: AlbumImageIndexStatus;
  cdn_image_url?: string;
  image_metadata?: string;
  is_hide?: number;
  s3_image_url?: string;
}
