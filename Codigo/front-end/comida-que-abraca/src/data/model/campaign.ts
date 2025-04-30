interface Campaign {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string; 
  endDate: string;
  photoUrl: string;
  status: "ACTIVE" | "CANCELED" | "FINISHED";
}

interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface CreateCampaignRequest {
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  photoUrl: string;  
  status: "ACTIVE"; 
}

export type { Campaign, CreateCampaignRequest, PaginatedResponse};
