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

  const addGroundReview = (groundId, newReview) => {
    setGrounds(prevGrounds => {
      return prevGrounds.map(ground => {
        if (ground.id === groundId) {
          const updatedReviews = [
            {
              id: `${ground.id}-r-${Date.now()}`,
              user: newReview.user || "Anonymous",
              rating: newReview.rating,
              comment: newReview.comment,
              date: new Date().toISOString().split('T')[0]
            },
            ...(ground.reviews || [])
          ];
          const averageRating = parseFloat(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...ground,
            reviews: updatedReviews,
            rating: averageRating
          };
        }
        return ground;
      });
    });
  };

  return (
    <GroundContext.Provider value={{ grounds, loading, error, addGroundReview }}>
      {children}
    </GroundContext.Provider>
  );
}
