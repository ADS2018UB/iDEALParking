import { GetQuote, ParkingFeatures } from './api.interfaces';

declare var BASE_API_PATH: string;

export const defaultFeatures: ParkingFeatures = {
  parkingType: 3,
  hasLift: false,
  hasPlan: false,
  newDev: false,
};

/**
 * Fetch the quote
 */
export function getQuote(
  latLng: [number, number],
  features: Partial<ParkingFeatures> = {},
): Promise<GetQuote> {
  const options = {
    ...defaultFeatures,
    ...features,
    longitude: latLng[1].toString(),
    latitude: latLng[0].toString(),
  };

  const queryString = Object.keys(options)
    .map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`,
    )
    .join('&');

  return fetch(`${BASE_API_PATH || ''}/api/v1/quote?${queryString}`).then(
    response => response.json(),
  );
}
