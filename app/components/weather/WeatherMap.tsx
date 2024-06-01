import PigeonMap from '~/components/map/PigeonMap';

const WeatherMap = ({
  longitude,
  latitude,
  FE_KEY,
}: {
  longitude: number;
  latitude: number;
  FE_KEY: string;
}) => (
  <div
    className="h-80 md:h-full md:min-h-[250px] card overflow-hidden z-0"
    id="map"
  >
    <PigeonMap longitude={longitude} latitude={latitude} FE_KEY={FE_KEY} />
  </div>
);

export default WeatherMap;
