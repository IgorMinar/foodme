'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('foodme', function() {

  describe('customer', function() {
    beforeEach(function() {
      browser().navigateTo('/index.html#/customer');
    });

    it('should persist customer information', function() {
      input('customerName').enter('Customer');
      input('customerAddress').enter('Address');

      element(':button.btn-primary').click();

      // reload the page
      browser().navigateTo('/index.html#/customer');

      expect(input('customerName').val()).toEqual('Customer');
      expect(input('customerAddress').val()).toEqual('Address');
    });


    it('should disable form submission button when empty', function() {
      input('customerName').enter('');
      input('customerAddress').enter('');

      expect(element(':button.btn-primary:disabled').count()).toEqual(1);
    });

  });


  describe('static routes', function() {
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


  describe('restaurants', function() {

    beforeEach(function() {
      browser().navigateTo('/index.html#/customer');

      // fill in the customer, so that we navigate to restaurants list
      input('customerName').enter('John');
      input('customerAddress').enter('Some city');
      element(':button.btn-primary').click();
    });


    it('should render restaurants from server', function() {
      var table = repeater('.fm-restaurant-list table tr');
      expect(table.count()).toEqual(40);
    });


    it('should show number of restaurants', function() {
      expect(element('.fm-restaurant-list h4').text()).toMatch('39 restaurants found');
    });
  });


  describe('fmDeliverTo', function() {

    beforeEach(function() {
      browser().navigateTo('/index.html#/customer');

      // fill in the customer, so that we navigate to restaurants list
      input('customerName').enter('John');
      input('customerAddress').enter('Some city');
      element(':button.btn-primary').click();
    });


    it('should show deliver to address', function() {
      expect(element('.breadcrumb').text()).toMatch('Some city');
    });
  });
});
