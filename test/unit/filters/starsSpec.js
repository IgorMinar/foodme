describe('filters stars', function() {

  it('should show proper number of stars', inject(function(starsFilter) {
    expect(starsFilter(1)).toBe('\u2605');
    expect(starsFilter(3)).toBe('\u2605\u2605\u2605');
  }));
});
