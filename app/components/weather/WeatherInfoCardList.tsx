import { FormattedData } from '~/lib/types/weather';
import {
  DewpointIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from '~/components/Icon/InfoIcon';

type WeatherInfoCardListProps = {
  className?: string;
  weather: FormattedData;
};
const WeatherInfoCardList = ({
  className,
  weather,
}: WeatherInfoCardListProps) => {
  const { current } = weather;
  return (
    <ul
      className={`${className} card p-4 gap-1 bg-base-dark dark:bg-wrapper-dark min-w-[18rem] h-full text-primary-dark`}
    >
      <>
        <WeatherInfoCard
          Icon={WindIcon}
          title="Wind Speed"
          content={`${Math.round(current.wind_speed)} km/h`}
        />
        <WeatherInfoCard
          Icon={VisibilityIcon}
          title="Visibility"
          content={`${current.visibility / 1000} km`}
        />
        <WeatherInfoCard
          Icon={PressureIcon}
          title="Pressure"
          content={`${current.pressure} hPa`}
        />
        <WeatherInfoCard
          Icon={DewpointIcon}
          title="Dew Point"
          content={`${current.dew_point.toFixed()}°C`}
        />
      </>
    </ul>
  );
};

type WeatherInfoCardProps = {
  Icon: React.FC;
  title: string;
  content: string;
};
const WeatherInfoCard = ({ Icon, title, content }: WeatherInfoCardProps) => (
  <li className="flex items-center justify-between gap-4 px-3 py-2 card bg-surface/5 dark:bg-surface-dark">
    <p className="flex items-center">
      <Icon />
      {title}
    </p>
    <p>{content}</p>
  </li>
);

export default WeatherInfoCardList;
