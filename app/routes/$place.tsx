import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';
import { getLocation, getWeather } from '~/lib/actions';
import dayjsExtended from '~/lib/utils/dayjsExtended';
import WeatherCard from '~/components/weather/WeatherCard';
import WeatherInfoCardList from '~/components/weather/WeatherInfoCardList';
import HourlyWeather from '~/components/weather/HourlyWeather';
import WeatherMap from '~/components/weather/WeatherMap';
import DailyWeather from '~/components/weather/DailyWeather';
import SearchCard from '~/components/SearchCard';
import Favorites from '~/components/Favorites';
export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { place } = params;
  const location = await getLocation(
    place,
    context.cloudflare.env.MAPBOX_BACKEND_KEY
  );
  const weather = await getWeather(
    location.coordinates[1],
    location.coordinates[0],
    context.cloudflare.env.OWM_KEY
  );
  return json({
    weather,
    location,
    FE_KEY: context.cloudflare.env.MAPBOX_FRONTEND_KEY,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.location.place_name} Weather | redvelo.site`,
      description: `Weather for ${data?.location.place_name} is ${Math.round(
        data?.weather.current.temp as number
      )}°C`,
      keywords: [
        `weather ${data?.location.place_name}`,
        `${data?.location.place_name} weather`,
        'Next.js',
        'React',
        'JavaScript',
        'Weather',
        'redvelo',
        'vercel weather',
        'weather vercel',
        'weather redvelocity',
        'redvelo.site',
        'redvelocity',
        'redvelocity.site',
        'redvelo.city',
        'red velocity',
        'weather red velocity',
      ],
      authors: [{ name: 'RedVelocity', url: 'https://redvelo.site' }],
      creator: 'RedVelocity',
      publisher: 'RedVelocity',
    },
  ];
};

const Place = () => {
  const { weather, location, FE_KEY } = useLoaderData<typeof loader>();
  return (
    <div className="grid gap-3 mx-4 lg:grid-cols-3">
      <section className="flex flex-col space-y-3">
        <SearchCard weather={weather} FE_KEY={FE_KEY} />
        <div className="grid h-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:flex">
          <div className="w-full md:col-span-2">
            <WeatherCard weather={weather} location={location} />
          </div>
          <div className="sm:hidden">
            <Favorites location={location} />
          </div>
          <WeatherInfoCardList className="grid lg:hidden" weather={weather} />
        </div>
      </section>
      <section className="lg:col-span-2">
        <HourlyWeather weather={weather} />
      </section>
      <WeatherInfoCardList className="hidden lg:grid" weather={weather} />
      <section className="hidden lg:col-span-2 sm:block">
        <Favorites location={location} />
      </section>
      <WeatherMap
        longitude={location.coordinates[0]}
        latitude={location.coordinates[1]}
        FE_KEY={FE_KEY}
      />
      <section className="lg:col-span-2">
        <DailyWeather weather={weather} />
      </section>
      <span className="text-sm tracking-wider text-center md:text-left md:text-lg">
        Updated at -
        {` ${dayjsExtended.tz(Date.now(), weather.timezone).format('HH:mm')} ${
          weather.timezone
        }`}
      </span>
    </div>
  );
};

export default Place;
