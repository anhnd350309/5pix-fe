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
  DataResponseAlbumImageItemResponsePublic,
  HTTPValidationError,
  PageAlbumImageItemResponsePublic,
  SearchByAlbumLinkPubImagesSearchByLinkPostParams,
  SearchPubImagesGetParams
} from '../../schemas'
import { defaultMutator } from '../../api/axiosInstance';



/**
 * ### API Search Album Image

- Để search theo image_name --> thực hiện upload ảnh với image_for_search = 1 từ API /base --> file_name --> sử dụng file_name đó truyền vào param image_name của API search này
- Update 28/4/2025: search_type bị deprecated, có thể tìm kiếm theo cả bib_number và avatar_file và image_name
 * @summary Search
 */
export const searchPubImagesGet = (
    params?: SearchPubImagesGetParams,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<PageAlbumImageItemResponsePublic>(
      {url: `/pub/images`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getSearchPubImagesGetQueryKey = (params?: SearchPubImagesGetParams,) => {
    return [`/pub/images`, ...(params ? [params]: [])] as const;
    }

    
export const getSearchPubImagesGetQueryOptions = <TData = Awaited<ReturnType<typeof searchPubImagesGet>>, TError = HTTPValidationError>(params?: SearchPubImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof searchPubImagesGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getSearchPubImagesGetQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof searchPubImagesGet>>> = ({ signal }) => searchPubImagesGet(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof searchPubImagesGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type SearchPubImagesGetQueryResult = NonNullable<Awaited<ReturnType<typeof searchPubImagesGet>>>
export type SearchPubImagesGetQueryError = HTTPValidationError


export function useSearchPubImagesGet<TData = Awaited<ReturnType<typeof searchPubImagesGet>>, TError = HTTPValidationError>(
 params: undefined |  SearchPubImagesGetParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof searchPubImagesGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof searchPubImagesGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useSearchPubImagesGet<TData = Awaited<ReturnType<typeof searchPubImagesGet>>, TError = HTTPValidationError>(
 params?: SearchPubImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof searchPubImagesGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof searchPubImagesGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useSearchPubImagesGet<TData = Awaited<ReturnType<typeof searchPubImagesGet>>, TError = HTTPValidationError>(
 params?: SearchPubImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof searchPubImagesGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Search
 */

export function useSearchPubImagesGet<TData = Awaited<ReturnType<typeof searchPubImagesGet>>, TError = HTTPValidationError>(
 params?: SearchPubImagesGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof searchPubImagesGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getSearchPubImagesGetQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * API Search Album Image
 * @summary Search By Album Link
 */
export const searchByAlbumLinkPubImagesSearchByLinkPost = (
    params?: SearchByAlbumLinkPubImagesSearchByLinkPostParams,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<PageAlbumImageItemResponsePublic>(
      {url: `/pub/images/search-by-link`, method: 'POST',
        params, signal
    },
      );
    }
  


export const getSearchByAlbumLinkPubImagesSearchByLinkPostMutationOptions = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof searchByAlbumLinkPubImagesSearchByLinkPost>>, TError,{params?: SearchByAlbumLinkPubImagesSearchByLinkPostParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof searchByAlbumLinkPubImagesSearchByLinkPost>>, TError,{params?: SearchByAlbumLinkPubImagesSearchByLinkPostParams}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof searchByAlbumLinkPubImagesSearchByLinkPost>>, {params?: SearchByAlbumLinkPubImagesSearchByLinkPostParams}> = (props) => {
          const {params} = props ?? {};

          return  searchByAlbumLinkPubImagesSearchByLinkPost(params,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type SearchByAlbumLinkPubImagesSearchByLinkPostMutationResult = NonNullable<Awaited<ReturnType<typeof searchByAlbumLinkPubImagesSearchByLinkPost>>>
    
    export type SearchByAlbumLinkPubImagesSearchByLinkPostMutationError = HTTPValidationError

    /**
 * @summary Search By Album Link
 */
export const useSearchByAlbumLinkPubImagesSearchByLinkPost = <TError = HTTPValidationError,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof searchByAlbumLinkPubImagesSearchByLinkPost>>, TError,{params?: SearchByAlbumLinkPubImagesSearchByLinkPostParams}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof searchByAlbumLinkPubImagesSearchByLinkPost>>,
        TError,
        {params?: SearchByAlbumLinkPubImagesSearchByLinkPostParams},
        TContext
      > => {

      const mutationOptions = getSearchByAlbumLinkPubImagesSearchByLinkPostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * ### API get detail Image by id

- Nếu image chưa có cdn_image_url --> chưa thể public --> không cho phép get
- Nếu album là public thì mới trả về s3_image_url
 * @summary Detail Image
 */
export const detailImagePubImagesImageIdGet = (
    imageId: number,
 signal?: AbortSignal
) => {
      
      
      return defaultMutator<DataResponseAlbumImageItemResponsePublic>(
      {url: `/pub/images/${imageId}`, method: 'GET', signal
    },
      );
    }
  

export const getDetailImagePubImagesImageIdGetQueryKey = (imageId: number,) => {
    return [`/pub/images/${imageId}`] as const;
    }

    
export const getDetailImagePubImagesImageIdGetQueryOptions = <TData = Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError = HTTPValidationError>(imageId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDetailImagePubImagesImageIdGetQueryKey(imageId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>> = ({ signal }) => detailImagePubImagesImageIdGet(imageId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(imageId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type DetailImagePubImagesImageIdGetQueryResult = NonNullable<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>>
export type DetailImagePubImagesImageIdGetQueryError = HTTPValidationError


export function useDetailImagePubImagesImageIdGet<TData = Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError = HTTPValidationError>(
 imageId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useDetailImagePubImagesImageIdGet<TData = Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError = HTTPValidationError>(
 imageId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useDetailImagePubImagesImageIdGet<TData = Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError = HTTPValidationError>(
 imageId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Detail Image
 */

export function useDetailImagePubImagesImageIdGet<TData = Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError = HTTPValidationError>(
 imageId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof detailImagePubImagesImageIdGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getDetailImagePubImagesImageIdGetQueryOptions(imageId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



