export type Place = {
  place_id: string;
  name: string;
  rating: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
    uri?: string;
  }[];
  vicinity: string;
};
