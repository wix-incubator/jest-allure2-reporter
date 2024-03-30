import { mapValues } from './mapValues';

describe('mapValues', () => {
  it('should map the values of an object using a provided iteratee function', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = mapValues(object, (value, key) => `${key}-${value}`);

    expect(result).toEqual({
      a: 'a-1',
      b: 'b-2',
      c: 'c-3',
    });
  });

  it('should handle an empty object', () => {
    const object = {};
    const result = mapValues(object, (value, key) => `${key}-${value}`);
    expect(result).toEqual({});
  });

  it('should handle nested objects', () => {
    const object = {
      person: {
        name: 'John Doe',
        age: 42,
      },
      company: {
        name: 'Acme Inc.',
        founded: 1990,
      },
    };

    const result = mapValues(object, (value, key) => {
      if (typeof value === 'object' && value !== null) {
        return mapValues(value, (nestedValue, nestedKey) => `${nestedKey}:${nestedValue}`);
      }
      return `${key}:${value}`;
    });

    expect(result).toEqual({
      person: {
        name: 'name:John Doe',
        age: 'age:42',
      },
      company: {
        name: 'name:Acme Inc.',
        founded: 'founded:1990',
      },
    });
  });
});
