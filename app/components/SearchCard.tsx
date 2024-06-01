import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { useNavigate } from '@remix-run/react';
import { useDebouncedValue } from '@mantine/hooks';
import {
  Button,
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { FormattedData } from '~/lib/types/weather';
import { FormattedLocation } from '~/lib/types/location';
import { getPlaces } from '~/lib/actions';
import useRecentSearch from '~/lib/hooks/useRecentSearch';
import getTheme from '~/lib/utils/getTheme';
import getLocationPath from '~/lib/utils/getLocationPath';

const variants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
  },
  initial: {
    opacity: 0,
    scale: 0.9,
  },
};

const colorVariants = {
  hot: 'rac-focus:bg-gradient-hot rac-focus:text-primary hover:bg-gradient-hot hover:text-primary',
  mild: 'rac-focus:bg-gradient-mild rac-focus:text-primary hover:bg-gradient-mild hover:text-primary',
  cool: 'rac-focus:bg-gradient-cool rac-focus:text-primary hover:bg-gradient-cool hover:text-primary',
};

const SearchCard = ({
  weather,
  FE_KEY,
}: {
  weather: FormattedData;
  FE_KEY: string;
}) => {
  const navigate = useNavigate();
  const theme = getTheme(weather.current.temp);
  const [placesList, setPlacesList] = useState<FormattedLocation[]>([]);
  // Recent search items
  const { searches, addSearch } = useRecentSearch();
  // Search item
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 100);
  // Update list on input change
  useEffect(
    () => {
      if (debouncedSearch) {
        (async () => {
          const places = await getPlaces(0, 0, debouncedSearch, FE_KEY);
          setPlacesList(places);
        })();
      } else {
        setPlacesList([]);
      }
    },
    [debouncedSearch] // Only call effect if debounced search term changes
  );
  return (
    <div className="z-10 p-4 card bg-wrapper-dark dark:bg-wrapper-dark/60 dark:backdrop-blur">
      <h3 className="text-primary-dark">Search</h3>
      <ComboBox
        menuTrigger="focus"
        inputValue={searchInput}
        onInputChange={setSearchInput}
        allowsCustomValue
        aria-label="search place"
        onSelectionChange={(placeId) => {
          if (placeId === null) return;
          const place =
            placesList.find((item) => item.id === placeId) ||
            searches.find((item) => item.id === placeId);
          if (place) {
            addSearch(place);
            navigate(
              `/${getLocationPath(place.place_name, place.place_locality)}`,
              { preventScrollReset: true }
            );
          }
        }}
      >
        {({ isOpen }) => (
          <>
            <div className="relative w-full mt-2">
              <Input className="w-full p-2 rounded-l bg-surface dark:bg-surface-dark rounded-r-3xl" />
              <Button
                className="absolute inset-y-0 right-0 flex items-center h-10 focus:ring-0 aspect-square"
                name="Toggle Menu"
              >
                <img
                  src="/assets/icons/chevron-down.png"
                  className={`${
                    isOpen && 'rotate-180'
                  } transition-transform duration-200 ease-in-out w-full h-full`}
                  alt="Toggle Menu"
                  sizes="2.5rem"
                />
              </Button>
            </div>
            <Popover className="w-[--trigger-width] mt-2 ">
              <motion.div
                className="overflow-x-hidden rounded-lg shadow max-h-80 bg-surface dark:bg-surface-dark"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {placesList.length > 0 && searchInput !== '' && (
                  <CustomListBox items={placesList} theme={theme} />
                )}
                {searches.length > 0 && searchInput === '' && (
                  <CustomListBox items={searches} theme={theme} />
                )}
              </motion.div>
            </Popover>
          </>
        )}
      </ComboBox>
    </div>
  );
};

const CustomListBox = ({
  items,
  theme,
}: {
  items: FormattedLocation[];
  theme: 'hot' | 'mild' | 'cool';
}) => (
  <ListBox items={items}>
    {(item) => (
      <ListBoxItem
        textValue={item.place_name}
        className={`${colorVariants[theme]} rounded-lg px-2 py-1 cursor-pointer mx-2 first:mt-2 last:mb-2 group`}
      >
        {({ isFocused }) => (
          <>
            <h5>{item.place_name}</h5>
            <p
              className={`text-secondary dark:text-secondary-dark group-hover:text-secondary ${
                isFocused && 'dark:text-secondary'
              } `}
            >
              {item.place_address}
            </p>
          </>
        )}
      </ListBoxItem>
    )}
  </ListBox>
);

export default SearchCard;
