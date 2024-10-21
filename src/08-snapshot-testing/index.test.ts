import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = ['test', 'test1', 'test2'];
    const expectedLinkedList = {
      value: 'test',
      next: {
        value: 'test1',
        next: {
          value: 'test2',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    const linkedList = generateLinkedList(elements);
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['test', 'test1', 'test2'];
    const linkedList = generateLinkedList(elements);
    expect(linkedList).toMatchSnapshot();
  });
});
