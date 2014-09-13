var assert 	= require('assert');
var time	= require('../time');

describe('Time Test Suite', function() {
	describe('Unit Tests', function() {
		it('should convert time to date', function() {
			assert.equal('Sep 12', time().toDate(1410535142494));
			assert.equal('Sep 12 11:02 PM', time().toDate(1410535142494, true));
			assert.equal('September 12, 2014', time().toDate(1410535142494, false, true));
			assert.equal('September 12, 2014 11:02 PM', time().toDate(1410535142494, true, true));
		});
		
		it('should convert time to relative', function() {
			assert.equal('Now', time().toRelative(time().now() - 1000));
			assert.equal('10 seconds ago', time().toRelative(time().now() - (1000 * 10)));
			assert.equal('1 minute ago', time().toRelative(time().now() - (1000 * 60)));
			assert.equal('2 hours ago', time().toRelative(time().now() - (1000 * 60 * 60 * 2)));
			assert.equal('Yesterday', time().toRelative(time().now() - (1000 * 60 * 60 * 24)));
			assert.equal('2 days ago', time().toRelative(time().now() - (1000 * 60 * 60 * 48)));
			assert.equal('2 weeks ago', time().toRelative(time().now() - (1000 * 60 * 60 * 24 * 14)));
			
			assert.equal('Now', time().toRelative(time().now() + 1000));
			assert.equal('in 10 seconds', time().toRelative(time().now() + (1000 * 10.1)));
			assert.equal('in 1 minute', time().toRelative(time().now() + (1000 * 60 * 1.5)));
			assert.equal('in 2 hours', time().toRelative(time().now() + (1000 * 60 * 60 * 2.5)));
			assert.equal('Tomorrow', time().toRelative(time().now() + (1000 * 60 * 60 * 25)));
			assert.equal('in 2 days', time().toRelative(time().now() + (1000 * 60 * 60 * 48)));
			assert.equal('in 2 weeks', time().toRelative(time().now() + (1000 * 60 * 60 * 24 * 14.1)));
		});
	});
});