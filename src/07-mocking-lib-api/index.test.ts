import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  const relativePath = '/posts/1';

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.get.mockResolvedValue({ data: { id: 1, title: 'Post 1' } });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual({ id: 1, title: 'Post 1' });
  });
});
