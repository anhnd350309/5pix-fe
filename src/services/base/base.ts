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
  useMutation
} from '@tanstack/react-query'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'
import type {
  BodyUploadToGetCdnBasePost,
  DataResponseImageCdn,
  HTTPValidationError,
  UploadToGetCdnBasePostParams
} from '../../schemas'
import { defaultMutator } from '../../api/axiosInstance';



/**
 * API Upload image to S3 and return image CDN
 * @summary Upload To Get Cdn
 */
export const uploadToGetCdnBasePost = (
    bodyUploadToGetCdnBasePost: BodyUploadToGetCdnBasePost,
    params?: UploadToGetCdnBasePostParams,
 signal?: AbortSignal
) => {
      
      const formData = new FormData();
formData.append('file_data', bodyUploadToGetCdnBasePost.file_data)

      return defaultMutator<DataResponseImageCdn>(
      {url: `/base`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData,
        params, signal
    },
      );
    }
  


export const getUploadToGetCdnBasePostMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadToGetCdnBasePost>>, TError,{data: BodyUploadToGetCdnBasePost;params?: UploadToGetCdnBasePostParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof uploadToGetCdnBasePost>>, TError,{data: BodyUploadToGetCdnBasePost;params?: UploadToGetCdnBasePostParams}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadToGetCdnBasePost>>, {data: BodyUploadToGetCdnBasePost;params?: UploadToGetCdnBasePostParams}> = (props) => {
          const {data,params} = props ?? {};

          return  uploadToGetCdnBasePost(data,params,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UploadToGetCdnBasePostMutationResult = NonNullable<Awaited<ReturnType<typeof uploadToGetCdnBasePost>>>
    export type UploadToGetCdnBasePostMutationBody = BodyUploadToGetCdnBasePost
    export type UploadToGetCdnBasePostMutationError = HTTPValidationError

    /**
 * @summary Upload To Get Cdn
 */
export const useUploadToGetCdnBasePost = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadToGetCdnBasePost>>, TError,{data: BodyUploadToGetCdnBasePost;params?: UploadToGetCdnBasePostParams}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof uploadToGetCdnBasePost>>,
        TError,
        {data: BodyUploadToGetCdnBasePost;params?: UploadToGetCdnBasePostParams},
        TContext
      > => {

      const mutationOptions = getUploadToGetCdnBasePostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    