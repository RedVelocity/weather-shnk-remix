import { useLocalStorage } from '@mantine/hooks';
import { FormattedLocation } from '~/lib/types/location';

const useRecentSearch = () => {
  const [searches, setSearches] = useLocalStorage<FormattedLocation[]>({
    key: 'recentSearches',
    defaultValue: [],
  });
  const MAX_SIZE = 5;

  const addSearch = (place: FormattedLocation) => {
    setSearches((prevSearches) => {
      const updatedSearches = [
        ...prevSearches.filter((s) => s.id !== place.id),
        place,
      ].slice(-MAX_SIZE);
      return updatedSearches;
    });
  };

  const removeSearch = (place: FormattedLocation) => {
    setSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter((s) => s.id !== place.id);
      return updatedSearches;
    });
  };

  return { searches, addSearch, removeSearch };
};

export default useRecentSearch;
