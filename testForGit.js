require('colors');
var chai = require('chai');
chai.should();

var wd;
try {
  wd = require('wd');
} catch (err) {
  wd = require('../../lib/main');
}

var user = "yos_nee";
var key = "54834c5d-087d-4e09-90e8-bd37743d499d"; 
browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, user, key);

// optional extra logging
browser.on('status', function (info) {
  console.log(info.cyan);
});
browser.on('command', function (eventType, command, response) {
  console.log(' > ' + eventType.cyan, command, (response || '').grey);
});
browser.on('http', function (meth, path, data) {
  console.log(' > ' + meth.magenta, path, (data || '').grey);
});

describe('Selenium Test Case', function () {

  it('should execute test case without errors', function (done) {
    this.timeout("disabled");
    browser.init({ browserName: 'chrome' }, function () {
      browser.get("http://admc.io/wd/test-pages/guinea-pig.html", function () {
        browser.title(function (err, title) {
          title.should.include('WD');
          browser.elementById('i am a link', function (err, el) {
            browser.clickElement(el, function () {
              /* jshint evil: true */
              browser.eval("window.location.href", function (err, href) {
                href.should.include('guinea-pig2');
                browser.quit(function (err) {
                    done(err);
                });
              });
            });
          });
        });
      });
    });
 });
});