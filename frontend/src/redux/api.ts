import { baseApi as api } from "./baseApi";
export const addTagTypes = ["auth", "services"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authCreate: build.mutation<AuthCreateApiResponse, AuthCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/`,
          method: "POST",
          body: queryArg.customTokenObtainPairRequest
        }),
        invalidatesTags: ["auth"]
      }),
      authRefreshCreate: build.mutation<AuthRefreshCreateApiResponse, AuthRefreshCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/refresh/`,
          method: "POST",
          body: queryArg.tokenRefreshRequest
        }),
        invalidatesTags: ["auth"]
      }),
      authRegisterCreate: build.mutation<AuthRegisterCreateApiResponse, AuthRegisterCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/register/`,
          method: "POST",
          body: queryArg.signUpRequest
        }),
        invalidatesTags: ["auth"]
      }),
      authVerifyCreate: build.mutation<AuthVerifyCreateApiResponse, AuthVerifyCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/verify/`,
          method: "POST",
          body: queryArg.tokenVerifyRequest
        }),
        invalidatesTags: ["auth"]
      }),
      salonItemsList: build.query<SalonItemsListApiResponse, SalonItemsListApiArg>({
        query: (queryArg) => ({
          url: `/api/salon/items/`,
          params: { page: queryArg.page, page_size: queryArg.pageSize }
        }),
        providesTags: ["services"]
      }),
      salonItemsRetrieve: build.query<SalonItemsRetrieveApiResponse, SalonItemsRetrieveApiArg>({
        query: (queryArg) => ({ url: `/api/salon/items/${queryArg.id}/` }),
        providesTags: ["services"]
      })
    }),
    overrideExisting: false
  });
export { injectedRtkApi as backendApi };
export type AuthCreateApiResponse = /** status 200  */ JwtAuthResponse;
export type AuthCreateApiArg = {
  customTokenObtainPairRequest: CustomTokenObtainPairRequestWrite;
};
export type AuthRefreshCreateApiResponse = /** status 200  */ TokenRefreshRead;
export type AuthRefreshCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequestWrite;
};
export type AuthRegisterCreateApiResponse = /** status 201  */ JwtAuthResponse;
export type AuthRegisterCreateApiArg = {
  signUpRequest: SignUpRequestWrite;
};
export type AuthVerifyCreateApiResponse = unknown;
export type AuthVerifyCreateApiArg = {
  tokenVerifyRequest: TokenVerifyRequestWrite;
};
export type SalonItemsListApiResponse = /** status 200  */ PaginatedBaseServiceListRead;
export type SalonItemsListApiArg = {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
};
export type SalonItemsRetrieveApiResponse = /** status 200  */ ServiceRead;
export type SalonItemsRetrieveApiArg = {
  /** A unique integer value identifying this service. */
  id: number;
};
export type JwtAuthResponse = {
  access: string;
  refresh: string;
};
export type CustomTokenObtainPairRequest = {};
export type CustomTokenObtainPairRequestWrite = {
  email: string;
  password: string;
};
export type TokenRefresh = {};
export type TokenRefreshRead = {
  access: string;
};
export type TokenRefreshRequest = {};
export type TokenRefreshRequestWrite = {
  refresh: string;
};
export type SignUpRequest = {
  email: string;
  first_name: string;
  last_name: string;
};
export type SignUpRequestWrite = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
export type TokenVerifyRequest = {};
export type TokenVerifyRequestWrite = {
  token: string;
};
export type BaseService = {
  title: string;
  price: number;
  duration: string;
};
export type BaseServiceRead = {
  id: number;
  title: string;
  price: number;
  duration: string;
};
export type PaginatedBaseServiceList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: BaseService[];
};
export type PaginatedBaseServiceListRead = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: BaseServiceRead[];
};
export type ServiceImage = {
  image: string;
};
export type ServiceImageRead = {
  id: number;
  image: string;
};
export type Service = {
  title: string;
  price: number;
  duration: string;
  images: ServiceImage[];
};
export type ServiceRead = {
  id: number;
  title: string;
  price: number;
  duration: string;
  images: ServiceImageRead[];
};
export const {
  useAuthCreateMutation,
  useAuthRefreshCreateMutation,
  useAuthRegisterCreateMutation,
  useAuthVerifyCreateMutation,
  useSalonItemsListQuery,
  useSalonItemsRetrieveQuery
} = injectedRtkApi;
