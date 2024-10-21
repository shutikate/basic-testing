import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs, { promises } from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 1000);
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCallback, 1000);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 1000);
    jest.advanceTimersByTime(3000);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'my-file.txt';
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const data = await readFileAsynchronously(pathToFile);
    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'This is content from the file';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(promises, 'readFile').mockResolvedValue(fileContent);
    const data = await readFileAsynchronously(pathToFile);
    expect(data).toBe(fileContent);
  });
});
