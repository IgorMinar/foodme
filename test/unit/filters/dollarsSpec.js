describe('filters dollars', function() {

  it('should show proper number of dollars', inject(function(dollarsFilter) {
    expect(dollarsFilter(1)).toBe('$');
    expect(dollarsFilter(3)).toBe('$$$');
  }));
});
