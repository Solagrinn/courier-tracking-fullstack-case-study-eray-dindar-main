import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUrlFilters<FilterObject extends Record<string, string>>(initial: FilterObject, debounce = 500) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filtersFromUrl = { ...initial };

  Object.keys(initial).forEach((filterKey) => {
    const paramValue = searchParams.get(filterKey);

    if (paramValue !== null) {
      filtersFromUrl[filterKey as keyof FilterObject] =
        paramValue as FilterObject[keyof FilterObject];
    }
  });

  const [filters, setFilters] = useState<FilterObject>(filtersFromUrl);
  const [debouncedFilters, setDebouncedFilters] = useState<FilterObject>(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, debounce);

    return () => clearTimeout(handler);
  }, [filters, debounce]);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(debouncedFilters).forEach(([key, value]) => {
          if (value) params.set(key, value);
          else params.delete(key);
        });

        return params;
      },
      { replace: true },
    );
  }, [debouncedFilters, setSearchParams]);

  const clearFilters = () => {
    setFilters(initial);
    setDebouncedFilters(initial);
    setSearchParams({});
  };

  return { filters, setFilters, clearFilters };
}
