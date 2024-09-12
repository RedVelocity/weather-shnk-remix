/* eslint-disable camelcase */

import { FormattedData, WeatherData } from '~/lib/types/weather';
import {
  Feature,
  FeatureLocation,
  FormattedLocation,
} from '~/lib/types/location';

export const getWeather = async (
  latitude: number,
  longitude: number,
  OWM_KEY: string
) => {
  const exclude = 'minutely,alerts';
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${OWM_KEY}&units=metric`;
  let formattedData: FormattedData;
  const res = await fetch(encodeURI(API_ENDPOINT));
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const { timezone, daily, current, hourly } = await res.json<WeatherData>();
  // eslint-disable-next-line prefer-const
  formattedData = {
    timezone,
    current: {
      ...current,
      weather: current.weather[0],
    },
    daily: daily.map((d) => ({
      dt: d.dt,
      temp: d.temp,
      weather: d.weather[0],
    })),
    hourly: hourly.map((h) => ({
      dt: h.dt,
      temp: h.temp,
      weather: h.weather[0],
    })),
  };
  return formattedData;
};

const formatLocation = (feature: Feature) => {
  const place_name = feature.text_en;
  const place_locality = !feature.context
    ? `${place_name}.`
    : `${feature.context
        .slice(-2)
        .map((ctx) => ctx.text_en)
        .join(', ')}.`;
  const formattedLocation: FormattedLocation = {
    id: feature.id,
    coordinates: feature.geometry.coordinates,
    place_name,
    place_locality,
    place_address: !feature.context
      ? place_locality
      : `${feature.context.map((ctx) => ctx.text_en).join(', ')}.`,
  };
  return formattedLocation;
};

export const getLocation = async (
  searchTerm: string | undefined,
  MAPBOX_BACKEND_KEY: string
) => {
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${MAPBOX_BACKEND_KEY}&types=place,locality&language=en&limit=1`;
  const res = await fetch(encodeURI(API_ENDPOINT));
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json<FeatureLocation>();
  console.log('location', data, API_ENDPOINT);
  const location = formatLocation(data.features[0]);
  return location;
};

export const getPlaces = async (
  latitude: number,
  longitude: number,
  searchTerm: string,
  MAPBOX_BACKEND_KEY: string
) => {
  const proximity =
    latitude !== 0 && longitude !== 0
      ? `&proximity=${longitude},${latitude}`
      : '';
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${MAPBOX_BACKEND_KEY}&types=place,locality&language=en&limit=25${proximity}`;

  const res = await fetch(encodeURI(API_ENDPOINT));
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json<FeatureLocation>();
  const places = data.features.map((feature) => formatLocation(feature));
  return places;
};
