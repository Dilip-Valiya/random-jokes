import { createFetcher } from "../Fetcher";
import {
  RANDOM_JOKE_END_POINT,
  TEN_RANDOM_JOKES_END_POINT,
  BASE_URL,
} from "../../constant";
import { Fetcher } from "../Fetcher/fetcher";

/**
 * Creates a new Application.
 * @agencies
 */
export default class Jokes {
  static instance: Jokes;
  fetcher: Fetcher;
  base_url: string;
  random_joke_endpoint: string;
  ten_jokes_endpoint: string;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Jokes(createFetcher());
    }
    return this.instance;
  }

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
    this.base_url = BASE_URL;
    this.random_joke_endpoint = RANDOM_JOKE_END_POINT;
    this.ten_jokes_endpoint = TEN_RANDOM_JOKES_END_POINT;
  }

  async getRandomJoke() {
    const url = `${this.base_url}${this.random_joke_endpoint}`;
    const response = await this.fetcher.getData(url);
    return response;
  }

  async getTenRandomJokes() {
    const url = `${this.base_url + this.ten_jokes_endpoint}`;
    const response = await this.fetcher.getData(url);
    return response;
  }
}

export const createJokes = () => Jokes.getInstance();
