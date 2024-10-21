import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const mockedData = {};

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(mockedData);

    await throttledGetDataFromApi(baseURL);

    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const endpoint = '/endpoint';
    const mockedData = {};

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(mockedData);

    await throttledGetDataFromApi(endpoint);

    expect(axios.get).toHaveBeenCalledWith(endpoint);
  });

  test('should return response data', async () => {
    const endpoint = '/user/1';
    const mockedData = {
      userId: 1,
      about: 'about user',
    };

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue({ data: mockedData });

    const result = await throttledGetDataFromApi(endpoint);

    expect(result).toEqual(mockedData);
  });
});
