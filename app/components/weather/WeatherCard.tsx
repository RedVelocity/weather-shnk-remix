import { m as motion } from 'framer-motion';
import { FormattedData } from '~/lib/types/weather';
import { FormattedLocation, Theme } from '~/lib/types/location';
import WeatherIcon from '~/components/Icon/WeatherIcon';
import getTheme from '~/lib/utils/getTheme';
import { colors } from '~/styles/colors';

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  initial: { opacity: 0, y: 10 },
};

const getBackgroundPosition = (theme: Theme) => {
  switch (theme) {
    case 'cool':
      return 'left';
    case 'mild':
      return 'center';
    case 'hot':
      return 'right';
    default:
      return 'left';
  }
};

const WeatherCard = ({
  weather,
  location,
}: {
  weather: FormattedData;
  location: FormattedLocation;
}) => {
  const { place_name, place_address } = location;
  const { current, daily } = weather;
  const theme = getTheme(current.temp);
  const backgroundPosition = getBackgroundPosition(theme);

  let additionalInfo;
  const { min: minTemp, max: maxTemp } = daily[0].temp;

  if (current?.weather) {
    additionalInfo = `Feels Like: ${Math.round(
      current.feels_like
    )}°C | Humidity: ${current.humidity}% | UVI: ${Math.round(current.uvi)}`;
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(140deg, ${colors.cool} 0%, ${colors.mild} 20%, ${colors.milder} 55%, ${colors.hot} 100%)`,
        backgroundSize: '1800px',
        backgroundPosition,
        transition: 'background-position 500ms linear',
      }}
      className="flex flex-col w-full h-full gap-2 p-4 card justify-evenly text-primary dark:filter dark:saturate-[70%]"
    >
      <div className="grid grid-cols-4 gap-4 py-2 place-items-center">
        <WeatherIcon icon={current.weather.icon} size="large" animate />
        <motion.h2
          className="col-span-2 text-center capitalize"
          key={current.weather.description}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          {current.weather.description}
        </motion.h2>
        <motion.h1
          key={current.temp}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          {`${Math.round(current.temp)}°C`}
        </motion.h1>
      </div>
      <p className="font-mono text-right text-primary">{`Low ${Math.round(
        minTemp
      )}°C • High ${Math.round(maxTemp)}°C`}</p>
      <span className="block p-2 my-2 font-semibold tracking-wide text-center rounded bg-surface md:px-4 md:py-3">
        {additionalInfo}
      </span>
      <div className="flex items-center space-x-2">
        <img
          src="/assets/icons/location.png"
          height={20}
          width={20}
          alt="location"
        />
        <p className="ml-1 font-mono text-primary">
          {`${place_name}, ${place_address.replace(`${place_name}, `, '')}`}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
