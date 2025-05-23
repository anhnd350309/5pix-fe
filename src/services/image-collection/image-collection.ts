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
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  AddImageImageCollectionClearOrderPutParams,
  AddImageResponse,
  AddImageToCollectionRequest,
  CollectionImageCreateRequest,
  CollectionImageResponse,
  CollectionImageWithQueryResponse,
  CreateByLinkImageCollectionCreateByLinkPostParams,
  GetImageCollectionCollectionItemGetParams,
  GetImageCollectionGetParams,
  GetOwnedImagesImageCollectionOwnedImagesGetParams,
  HTTPValidationError,
  PageCollectionImageResponse,
  PageOwnedImageResponse,
  RemoveImageRequest,
  RemoveImageResponse
} from '../../schemas'
import { defaultMutator } from '../../api/axiosInstance';



/**
 * ### Fetch collection thuộc requester
 * @summary Get
 */
export const getImageCollectionGet = (
    params?: GetImageCollectionGetParams,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<PageCollectionImageResponse>(
      {url: `/image-collection`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetImageCollectionGetQueryKey = (params?: GetImageCollectionGetParams,) => {
    return [`/image-collection`, ...(params ? [params]: [])] as const;
    }

    
export const getGetImageCollectionGetQueryOptions = <TData = Awaited<ReturnType<typeof getImageCollectionGet>>, TError = HTTPValidationError>(params?: GetImageCollectionGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetImageCollectionGetQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getImageCollectionGet>>> = ({ signal }) => getImageCollectionGet(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetImageCollectionGetQueryResult = NonNullable<Awaited<ReturnType<typeof getImageCollectionGet>>>
export type GetImageCollectionGetQueryError = HTTPValidationError


export function useGetImageCollectionGet<TData = Awaited<ReturnType<typeof getImageCollectionGet>>, TError = HTTPValidationError>(
 params: undefined |  GetImageCollectionGetParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getImageCollectionGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetImageCollectionGet<TData = Awaited<ReturnType<typeof getImageCollectionGet>>, TError = HTTPValidationError>(
 params?: GetImageCollectionGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getImageCollectionGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetImageCollectionGet<TData = Awaited<ReturnType<typeof getImageCollectionGet>>, TError = HTTPValidationError>(
 params?: GetImageCollectionGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get
 */

export function useGetImageCollectionGet<TData = Awaited<ReturnType<typeof getImageCollectionGet>>, TError = HTTPValidationError>(
 params?: GetImageCollectionGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetImageCollectionGetQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * ### Fetch collection item của 1 collection id thuộc user
 * @summary Get
 */
export const getImageCollectionCollectionItemGet = (
    params?: GetImageCollectionCollectionItemGetParams,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<CollectionImageWithQueryResponse>(
      {url: `/image-collection/collection-item`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetImageCollectionCollectionItemGetQueryKey = (params?: GetImageCollectionCollectionItemGetParams,) => {
    return [`/image-collection/collection-item`, ...(params ? [params]: [])] as const;
    }

    
export const getGetImageCollectionCollectionItemGetQueryOptions = <TData = Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError = HTTPValidationError>(params?: GetImageCollectionCollectionItemGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetImageCollectionCollectionItemGetQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>> = ({ signal }) => getImageCollectionCollectionItemGet(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetImageCollectionCollectionItemGetQueryResult = NonNullable<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>>
export type GetImageCollectionCollectionItemGetQueryError = HTTPValidationError


export function useGetImageCollectionCollectionItemGet<TData = Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError = HTTPValidationError>(
 params: undefined |  GetImageCollectionCollectionItemGetParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetImageCollectionCollectionItemGet<TData = Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError = HTTPValidationError>(
 params?: GetImageCollectionCollectionItemGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetImageCollectionCollectionItemGet<TData = Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError = HTTPValidationError>(
 params?: GetImageCollectionCollectionItemGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get
 */

export function useGetImageCollectionCollectionItemGet<TData = Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError = HTTPValidationError>(
 params?: GetImageCollectionCollectionItemGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getImageCollectionCollectionItemGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetImageCollectionCollectionItemGetQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * ### API tạo collection cho imageCollection chứa ảnh trong 1 album cụ thể  
Owner là requester
 * @summary Create
 */
export const createImageCollectionCreatePost = (
    collectionImageCreateRequest: CollectionImageCreateRequest,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<CollectionImageResponse>(
      {url: `/image-collection/create`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: collectionImageCreateRequest, signal
    },
      );
    }
  


export const getCreateImageCollectionCreatePostMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createImageCollectionCreatePost>>, TError,{data: CollectionImageCreateRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof createImageCollectionCreatePost>>, TError,{data: CollectionImageCreateRequest}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createImageCollectionCreatePost>>, {data: CollectionImageCreateRequest}> = (props) => {
          const {data} = props ?? {};

          return  createImageCollectionCreatePost(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateImageCollectionCreatePostMutationResult = NonNullable<Awaited<ReturnType<typeof createImageCollectionCreatePost>>>
    export type CreateImageCollectionCreatePostMutationBody = CollectionImageCreateRequest
    export type CreateImageCollectionCreatePostMutationError = HTTPValidationError

    /**
 * @summary Create
 */
export const useCreateImageCollectionCreatePost = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createImageCollectionCreatePost>>, TError,{data: CollectionImageCreateRequest}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof createImageCollectionCreatePost>>,
        TError,
        {data: CollectionImageCreateRequest},
        TContext
      > => {

      const mutationOptions = getCreateImageCollectionCreatePostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * ### API Tạo collection theo album_link

- Album_link là link của 1 album đã được tạo trước đó
- Sử dụng khi User click mua toàn bộ ảnh theo link đã được gen  
- Logic: check link --> album_images --> add to collection
 * @summary Create By Link
 */
export const createByLinkImageCollectionCreateByLinkPost = (
    params: CreateByLinkImageCollectionCreateByLinkPostParams,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<CollectionImageResponse>(
      {url: `/image-collection/create-by-link`, method: 'POST',
        params, signal
    },
      );
    }
  


export const getCreateByLinkImageCollectionCreateByLinkPostMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createByLinkImageCollectionCreateByLinkPost>>, TError,{params: CreateByLinkImageCollectionCreateByLinkPostParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof createByLinkImageCollectionCreateByLinkPost>>, TError,{params: CreateByLinkImageCollectionCreateByLinkPostParams}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createByLinkImageCollectionCreateByLinkPost>>, {params: CreateByLinkImageCollectionCreateByLinkPostParams}> = (props) => {
          const {params} = props ?? {};

          return  createByLinkImageCollectionCreateByLinkPost(params,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateByLinkImageCollectionCreateByLinkPostMutationResult = NonNullable<Awaited<ReturnType<typeof createByLinkImageCollectionCreateByLinkPost>>>
    
    export type CreateByLinkImageCollectionCreateByLinkPostMutationError = HTTPValidationError

    /**
 * @summary Create By Link
 */
export const useCreateByLinkImageCollectionCreateByLinkPost = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createByLinkImageCollectionCreateByLinkPost>>, TError,{params: CreateByLinkImageCollectionCreateByLinkPostParams}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof createByLinkImageCollectionCreateByLinkPost>>,
        TError,
        {params: CreateByLinkImageCollectionCreateByLinkPostParams},
        TContext
      > => {

      const mutationOptions = getCreateByLinkImageCollectionCreateByLinkPostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * ### API Add image vào 1 collection cụ thể (hoặc tự động tạo)Collection chứa ảnh trong 1 list album image id
 * @summary Add Image
 */
export const addImageImageCollectionAddImagePost = (
    addImageToCollectionRequest: AddImageToCollectionRequest,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<AddImageResponse>(
      {url: `/image-collection/add-image`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: addImageToCollectionRequest, signal
    },
      );
    }
  


export const getAddImageImageCollectionAddImagePostMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof addImageImageCollectionAddImagePost>>, TError,{data: AddImageToCollectionRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof addImageImageCollectionAddImagePost>>, TError,{data: AddImageToCollectionRequest}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof addImageImageCollectionAddImagePost>>, {data: AddImageToCollectionRequest}> = (props) => {
          const {data} = props ?? {};

          return  addImageImageCollectionAddImagePost(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AddImageImageCollectionAddImagePostMutationResult = NonNullable<Awaited<ReturnType<typeof addImageImageCollectionAddImagePost>>>
    export type AddImageImageCollectionAddImagePostMutationBody = AddImageToCollectionRequest
    export type AddImageImageCollectionAddImagePostMutationError = HTTPValidationError

    /**
 * @summary Add Image
 */
export const useAddImageImageCollectionAddImagePost = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof addImageImageCollectionAddImagePost>>, TError,{data: AddImageToCollectionRequest}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof addImageImageCollectionAddImagePost>>,
        TError,
        {data: AddImageToCollectionRequest},
        TContext
      > => {

      const mutationOptions = getAddImageImageCollectionAddImagePostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * ### API Xóa images trong 1 collection cụ thể
 * @summary Remove Image
 */
export const removeImageImageCollectionRemoveImageDelete = (
    removeImageRequest: RemoveImageRequest,
 ) => {
      
      
      return defaultMutator<RemoveImageResponse>(
      {url: `/image-collection/remove-image`, method: 'DELETE',
      headers: {'Content-Type': 'application/json', },
      data: removeImageRequest
    },
      );
    }
  


export const getRemoveImageImageCollectionRemoveImageDeleteMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof removeImageImageCollectionRemoveImageDelete>>, TError,{data: RemoveImageRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof removeImageImageCollectionRemoveImageDelete>>, TError,{data: RemoveImageRequest}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof removeImageImageCollectionRemoveImageDelete>>, {data: RemoveImageRequest}> = (props) => {
          const {data} = props ?? {};

          return  removeImageImageCollectionRemoveImageDelete(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type RemoveImageImageCollectionRemoveImageDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof removeImageImageCollectionRemoveImageDelete>>>
    export type RemoveImageImageCollectionRemoveImageDeleteMutationBody = RemoveImageRequest
    export type RemoveImageImageCollectionRemoveImageDeleteMutationError = HTTPValidationError

    /**
 * @summary Remove Image
 */
export const useRemoveImageImageCollectionRemoveImageDelete = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof removeImageImageCollectionRemoveImageDelete>>, TError,{data: RemoveImageRequest}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof removeImageImageCollectionRemoveImageDelete>>,
        TError,
        {data: RemoveImageRequest},
        TContext
      > => {

      const mutationOptions = getRemoveImageImageCollectionRemoveImageDeleteMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * ### API lấy danh sách ảnh đang sở hữu
 * @summary Get Owned Images
 */
export const getOwnedImagesImageCollectionOwnedImagesGet = (
    params?: GetOwnedImagesImageCollectionOwnedImagesGetParams,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<PageOwnedImageResponse>(
      {url: `/image-collection/owned-images`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetOwnedImagesImageCollectionOwnedImagesGetQueryKey = (params?: GetOwnedImagesImageCollectionOwnedImagesGetParams,) => {
    return [`/image-collection/owned-images`, ...(params ? [params]: [])] as const;
    }

    
export const getGetOwnedImagesImageCollectionOwnedImagesGetQueryOptions = <TData = Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError = HTTPValidationError>(params?: GetOwnedImagesImageCollectionOwnedImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetOwnedImagesImageCollectionOwnedImagesGetQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>> = ({ signal }) => getOwnedImagesImageCollectionOwnedImagesGet(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetOwnedImagesImageCollectionOwnedImagesGetQueryResult = NonNullable<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>>
export type GetOwnedImagesImageCollectionOwnedImagesGetQueryError = HTTPValidationError


export function useGetOwnedImagesImageCollectionOwnedImagesGet<TData = Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError = HTTPValidationError>(
 params: undefined |  GetOwnedImagesImageCollectionOwnedImagesGetParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetOwnedImagesImageCollectionOwnedImagesGet<TData = Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError = HTTPValidationError>(
 params?: GetOwnedImagesImageCollectionOwnedImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetOwnedImagesImageCollectionOwnedImagesGet<TData = Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError = HTTPValidationError>(
 params?: GetOwnedImagesImageCollectionOwnedImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get Owned Images
 */

export function useGetOwnedImagesImageCollectionOwnedImagesGet<TData = Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError = HTTPValidationError>(
 params?: GetOwnedImagesImageCollectionOwnedImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOwnedImagesImageCollectionOwnedImagesGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetOwnedImagesImageCollectionOwnedImagesGetQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * ### Hủy 1 order của collection , order bị hủy sẽ có status CANCELLED
                    Collect giữ nguyên , và có thể edit lại như cũ
 * @summary Add Image
 */
export const addImageImageCollectionClearOrderPut = (
    params: AddImageImageCollectionClearOrderPutParams,
 ) => {
      
      
      return defaultMutator<AddImageResponse>(
      {url: `/image-collection/clear-order`, method: 'PUT',
        params
    },
      );
    }
  


export const getAddImageImageCollectionClearOrderPutMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof addImageImageCollectionClearOrderPut>>, TError,{params: AddImageImageCollectionClearOrderPutParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof addImageImageCollectionClearOrderPut>>, TError,{params: AddImageImageCollectionClearOrderPutParams}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof addImageImageCollectionClearOrderPut>>, {params: AddImageImageCollectionClearOrderPutParams}> = (props) => {
          const {params} = props ?? {};

          return  addImageImageCollectionClearOrderPut(params,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AddImageImageCollectionClearOrderPutMutationResult = NonNullable<Awaited<ReturnType<typeof addImageImageCollectionClearOrderPut>>>
    
    export type AddImageImageCollectionClearOrderPutMutationError = HTTPValidationError

    /**
 * @summary Add Image
 */
export const useAddImageImageCollectionClearOrderPut = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof addImageImageCollectionClearOrderPut>>, TError,{params: AddImageImageCollectionClearOrderPutParams}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof addImageImageCollectionClearOrderPut>>,
        TError,
        {params: AddImageImageCollectionClearOrderPutParams},
        TContext
      > => {

      const mutationOptions = getAddImageImageCollectionClearOrderPutMutationOptions(options);

      return useMutation(mutationOptions);
    }
    