type Weather = {
  id: number;
  main: string;
  description: string;
  icon: WeatherIconKey;
};

type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
};

type HourlyWeather = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  pop: number;
};

type TempDetails = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type FeelsLikeDetails = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

type DailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: TempDetails;
  feels_like: FeelsLikeDetails;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
};

type WeatherData = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

type FormattedData = {
  timezone: string;
  current: Omit<CurrentWeather, 'weather'> & { weather: Weather };
  daily: {
    dt: number;
    temp: TempDetails;
    weather: Weather;
  }[];
  hourly: {
    dt: number;
    temp: number;
    weather: Weather;
  }[];
};

// Define a union type for all possible weather icon keys
type WeatherIconKey =
  | '01d'
  | '01n'
  | '02d'
  | '02n'
  | '03d'
  | '03n'
  | '04d'
  | '04n'
  | '09d'
  | '09n'
  | '10d'
  | '10n'
  | '11d'
  | '11n'
  | '13d'
  | '13n'
  | '50d'
  | '50n';

// Define a union type for all possible values
type WeatherIconValue =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'rain'
  | 'thunderstorm'
  | 'sleet'
  | 'fog';

// Define the type for the weatherIcons object
type WeatherIcons = { [key in WeatherIconKey]: WeatherIconValue };

export type { FormattedData, WeatherData, WeatherIcons, WeatherIconKey };
