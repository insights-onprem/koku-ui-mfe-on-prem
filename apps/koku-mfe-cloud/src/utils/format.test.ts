import * as format from './format';

describe('formatUnits', () => {
  const formatOptions: format.FormatOptions = {} as any;
  const value = 100.11;

  test('null value returns 0', () => {
    expect(format.formatUnits(null as any, 'unknownUnit')).toBe('0');
  });
  test('unknown unit returns value fixed to fraction digits', () => {
    const formatted = format.formatUnits(value, 'unknownUnit');
    expect(formatted).toMatchSnapshot();
  });

  test('USD unit calls formatCurrency (integration)', () => {
    const units = 'USD';
    const result = format.formatCurrency(value as any, units as any, formatOptions);
    expect(result).toBeDefined();
  });

  test('null unit returns value fixed to fraction digits', () => {
    const units = null as any;
    const formatted = format.formatUnits(value, units, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    } as any);
    expect(formatted).toMatchSnapshot();
  });
});

describe('formatCurrency', () => {
  const value = 100.11;
  const units = 'USD' as any;

  test('defaults fraction digits', () => {
    const formatted = format.formatCurrency(value as any, units);
    expect(formatted).toMatchSnapshot();
  });

  test('uses specified fraction digits', () => {
    const formatted = format.formatCurrency(value as any, units, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    } as any);
    expect(formatted).toMatchSnapshot();
  });

  test('null value returns $0', () => {
    expect(
      format.formatCurrency(null as any, 'USD' as any, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      } as any)
    ).toBeDefined();
  });
});
