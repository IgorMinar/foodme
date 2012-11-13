'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('foodme', function() {

  describe('customer', function() {
    beforeEach(function() {
      browser().navigateTo('/index.html');
    });

    it('should read delivery information', function() {
      var alertText;

      input('customerName').enter('Customer');
      input('address').enter('Address');
      element(':button.btn-primary').click();

      browser().navigateTo('/index.html#/');

      expect(input('customerName').val()).toEqual('Customer');
      expect(input('address').val()).toEqual('Address');
    });

    it('should disable form submission button when empty', function() {
      input('customerName').enter('');
      input('address').enter('');

      expect(element(":button.btn-primary:disabled").count()).toEqual(1);
    });

  });

  describe("routes", function() {
    it('should navigate to who we are', function() {
      browser().navigateTo('/index.html#/who-we-are');
      expect(element('ng-view').text()).
          toContain('We are purple unicorns jockeys and knitters of woolen socks');
    });

    it('should navigate to how it works', function() {
      browser().navigateTo('/index.html#/how-it-works');
      expect(element('ng-view').text()).toContain('It\'s simple:');
    });

    it('should navigate to help', function() {
      browser().navigateTo('/index.html#/help');
      expect(element('ng-view').text()).
          toContain('Until how late do you deliver');
    });
  });
});
