/* 
  clickSuck qunit tests 
  8 July 2015
  
  Verify that clickSuck captures touchend events as click events when environment 
  supports ontouchstart.
*/

QUnit.module('clickSuck', {
    beforeEach: function () {
      
      this.touchend = new Event('touchend', {"bubbles": true, cancelable: true});
      this.click = new Event('click', {"bubbles": true, cancelable: true});

      this.spy = function spy (e) {
        spy.count += 1;
      };
      this.spy.count = 0;
      
      document.body.addEventListener('click', this.spy);
    },
    afterEach: function () {
      document.body.removeEventListener('click', this.spy);
    }
});

QUnit.test( "does not capture touchend as click when not touchEnabled", function( assert ) {
  
  clickSuck.settings.touchEnabled = false;
  clickSuck.init();
  
  document.getElementById('qunit-fixture').dispatchEvent(this.touchend);
  assert.equal( this.spy.count, 0, 'should not capture touchend' );
  
  document.getElementById('qunit-fixture').dispatchEvent(this.click);
  assert.equal( this.spy.count, 1, 'captures click' );  
});

QUnit.test( "captures touchend as click when touchEnabled", function( assert ) {
  
  clickSuck.settings.touchEnabled = true;
  clickSuck.init();
  
  assert.equal( this.spy.count, 0, 'no events yet');
  
  document.getElementById('qunit-fixture').dispatchEvent(this.click);
  assert.equal( this.spy.count, 1, 'captures click' );

  document.getElementById('qunit-fixture').dispatchEvent(this.touchend);
  assert.equal( this.spy.count, 2, 'captures touchend as click' );
});
