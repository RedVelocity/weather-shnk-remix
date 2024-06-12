import { Suspense, lazy } from 'react';

const PigeonMap = lazy(() => import('~/components/map/PigeonMap'));

const WeatherMap = ({
  longitude,
  latitude,
  FE_KEY,
}: {
  longitude: number;
  latitude: number;
  FE_KEY: string;
}) => {
  return (
    <div
      className="h-80 md:h-full md:min-h-[250px] card overflow-hidden z-0"
      id="map"
    >
      <Suspense>
        <PigeonMap longitude={longitude} latitude={latitude} FE_KEY={FE_KEY} />
      </Suspense>
    </div>
  );
};

export default WeatherMap;
