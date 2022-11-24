import { useQuery } from "@tanstack/react-query";

import { createJokes } from "../Repository";

const jokesReq = createJokes();

/**
 * this function(query) is to get All filters data
 * @function useRandomJokeGetQuery
 * @param {Object} reqParams params pass along with the api call
 * @param {Object} options to be passed as query handling
 * @returns api response
 */
export function useRandomJokeGetQuery(reqParams: object, options: object) {
  return useQuery(
    ["randomJokeGetQuery", reqParams],
    () => jokesReq.getRandomJoke(),
    {
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      ...options,
    }
  );
}

/**
 * this function(query) is to get All filters data
 * @function useTenRandomJokesGetQuery
 * @param {Object} reqParams params pass along with the api call
 * @param {Object} options to be passed as query handling
 * @returns api response
 */
export function useTenRandomJokesGetQuery(reqParams: object, options: object) {
  return useQuery(
    ["tenRandomJokesGetQuery", reqParams],
    () => jokesReq.getTenRandomJokes(),
    {
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      ...options,
    }
  );
}
