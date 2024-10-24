import { m as motion } from 'framer-motion';
import { FormattedData } from '~/lib/types/weather';
import { FormattedLocation, Theme } from '~/lib/types/location';
import WeatherIcon from '~/components/Icon/WeatherIcon';
import getTheme from '~/lib/utils/getTheme';
import { colors } from '~/styles/colors';
// import extractCountry from '~/lib/utils/extractCountry';

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
  photo?: string;
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
        // backgroundImage: `url(${photo})`,
        // backgroundSize: 'cover',
        // color: 'white',
        backgroundSize: '1800px',
        backgroundPosition,
        transition: 'background-position 500ms linear',
      }}
      className="flex flex-col w-full h-full gap-2 p-4 card justify-evenly text-primary dark:filter dark:saturate-[70%] relative overflow-hidden -z-10"
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
      <h4 className="font-mono text-right ">{`Night ${Math.round(
        minTemp
      )}°C • Day ${Math.round(maxTemp)}°C`}</h4>
      {/* <span className="absolute text-[15rem] text-nowrap mix-blend-color-dodge opacity-40 text-primary -z-20">
        {extractCountry(place_address)}
      </span> */}
      {/* <div className="absolute inset-0 bg-base-dark opacity-30 -z-20 backdrop-blur-lg"></div> */}
      <span className="block p-2 my-2 font-semibold tracking-wide text-center rounded bg-surface md:px-4 md:py-3 text-primary">
        {additionalInfo}
      </span>
      <div className="flex items-center space-x-2">
        <img
          src="/assets/icons/location.png"
          height={20}
          width={20}
          alt="location"
        />
        <h5 className="ml-1 ">
          {`${place_name}, ${place_address.replace(`${place_name}, `, '')}`}
        </h5>
      </div>
    </div>
  );
};

export default WeatherCard;
