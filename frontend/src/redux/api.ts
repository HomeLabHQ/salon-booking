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
  customTokenObtainPairRequest: CustomTokenObtainPairRequest;
};
export type AuthRefreshCreateApiResponse = /** status 200  */ TokenRefresh;
export type AuthRefreshCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequest;
};
export type AuthRegisterCreateApiResponse = /** status 201  */ JwtAuthResponse;
export type AuthRegisterCreateApiArg = {
  signUpRequest: SignUpRequest;
};
export type AuthVerifyCreateApiResponse = unknown;
export type AuthVerifyCreateApiArg = {
  tokenVerifyRequest: TokenVerifyRequest;
};
export type SalonItemsListApiResponse = /** status 200  */ PaginatedBaseServiceList;
export type SalonItemsListApiArg = {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
};
export type SalonItemsRetrieveApiResponse = /** status 200  */ Service;
export type SalonItemsRetrieveApiArg = {
  /** A unique integer value identifying this service. */
  id: number;
};
export type JwtAuthResponse = {
  access: string;
  refresh: string;
};
export type CustomTokenObtainPairRequest = {
  email: string;
  password: string;
};
export type TokenRefresh = {
  access: string;
};
export type TokenRefreshRequest = {
  refresh: string;
};
export type SignUpRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
export type TokenVerifyRequest = {
  token: string;
};
export type BaseService = {
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
export type ServiceImage = {
  id: number;
  image: string;
};
export type Service = {
  id: number;
  title: string;
  price: number;
  duration: string;
  images: ServiceImage[];
};
export const {
  useAuthCreateMutation,
  useAuthRefreshCreateMutation,
  useAuthRegisterCreateMutation,
  useAuthVerifyCreateMutation,
  useSalonItemsListQuery,
  useSalonItemsRetrieveQuery
} = injectedRtkApi;
