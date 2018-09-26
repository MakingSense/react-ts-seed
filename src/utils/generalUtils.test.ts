import { memorize } from './generalUtils';

describe('generalUtils', () => {
  describe('memorize', () => {
    let concat: jest.Mock;
    beforeEach(() => {
      concat = jest.fn().mockReturnValue('ab');
    });

    it('should memorize a functions return values', () => {
      const wrappedConcat = memorize(concat);
      expect(wrappedConcat('a', 'b')).toEqual('ab');
      wrappedConcat('a', 'b');
      expect(concat.mock.calls).toHaveLength(1);
    });

    it('should enforce a max cache value', () => {
      const wrappedConcat = memorize(concat, 2);
      wrappedConcat('1', '1');
      wrappedConcat('2', '2');
      wrappedConcat('3', '3');
      wrappedConcat('2', '2');
      expect(concat.mock.calls).toHaveLength(3);
    });
  });
});
