import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [11, 22, 33];
    const expectedLinkedList = {
      value: values[0],
      next: {
        value: values[1],
        next: {
          value: values[2],
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(values)).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const values = ['el1', 'el2', 'el3'];

    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
