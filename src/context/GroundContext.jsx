import { createContext, useState, useEffect } from 'react';
import { groundService } from '../services/groundService';

export const GroundContext = createContext();

export function GroundProvider({ children }) {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const data = await groundService.getAllGrounds();
        setGrounds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  return (
    <GroundContext.Provider value={{ grounds, loading, error }}>
      {children}
    </GroundContext.Provider>
  );
}
