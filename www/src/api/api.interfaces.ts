/**
 * API responses
 */

export interface BaseResponse {
  errors: string[] | null;
  result: any | null;
}

export interface District {
  district_number: number;
  name: string;
}

export interface GetQuoteOkResponse {
  errors: null;
  result: {
    price: number;
    district: District;
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

export interface ParkingFeatures {
  parkingType: number;
  hasLift: boolean;
  hasPlan: boolean;
  newDev: boolean;
}
