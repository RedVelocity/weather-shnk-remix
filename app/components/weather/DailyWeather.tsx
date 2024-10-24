import { FormattedData } from "~/lib/types/weather";
import dayjsExtended from "~/lib/utils/dayjsExtended";
import WeatherIcon from "~/components/Icon/WeatherIcon";

const DailyWeather = ({ weather }: { weather: FormattedData }) => {
  const { daily, timezone: TZ } = weather;
  dayjsExtended.tz(daily[0].dt, TZ);

  return (
    <div className="wrapper">
      <h3>8-Day Forecast</h3>
      <div className="grid gap-2 mt-4 text-center capitalize sm:grid-cols-2">
        {daily.map((item, i) => (
          <div
            className="flex lg:grid grid-cols-2 gap-4 p-4 justify-between card surface"
            key={`summary-${i}`}
          >
            <div className="grid grid-cols-2 md:flex items-center justify-around gap-2">
              <WeatherIcon icon={item.weather.icon} size="medium" />
              <h4 className="leading-4 text-left">
                {i !== 0
                  ? dayjsExtended
                      .tz(dayjsExtended.unix(item.dt), TZ)
                      .format("ddd DD")
                  : "Today"}
              </h4>
              <div className="flex items-center gap-1 text-secondary dark:text-secondary-dark">
                <img
                  src="/assets/icons/rain_drops.png"
                  height={20}
                  width={20}
                  alt="precipitation"
                />
                <span>{`${item.pop * 100}%`}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1 text-right">
              <span className="text-lg">{item.weather.description}</span>
              <h4>{`${Math.round(item.temp.min)}°C • ${Math.round(
                item.temp.max
              )}°C`}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeather;
