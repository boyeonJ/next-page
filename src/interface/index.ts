export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
}

export interface SearchParams {
  page?: string,
  q?: string
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}
