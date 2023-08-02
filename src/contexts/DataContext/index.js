import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo, // Ajoutez ceci
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const calculateLastEvent = (events) => {
    if (!events || events.length === 0) {
      return null;
    }
    const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedEvents[0];
  };

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  const lastEvent = useMemo(() => calculateLastEvent(data?.events), [data?.events]); // Utilisez useMemo ici

  const contextValue = useMemo(
    () => ({
      data,
      error,
      last: lastEvent,
    }),
    [data, error, lastEvent]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
