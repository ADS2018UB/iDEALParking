/**
 * API responses
 */

export interface BaseResponse {
  errors: string[] | null;
  result: any | null;
}

export interface GetQuoteOkResponse {
  errors: null;
  results: {
    price: number;
  };
}

export interface GetQuoteErrorResponse {
  result: null;
  errors: string[];
}

export type GetQuote = GetQuoteOkResponse | GetQuoteErrorResponse;

export interface GetQuoteInput {
  longitude: number;
  latitude: number;
}
