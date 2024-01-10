import { useEffect, useState } from 'react';

export default function useFetch<T>(fetchFunc: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const data = await fetchFunc();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchFunc]);

  return { data, error, isLoading };
}
