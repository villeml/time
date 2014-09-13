module.exports = require('eden-class').extend(function(prototype) {
	/* Require
	-------------------------------*/
	var argument = require('argument');
	
	/* Constants
	-------------------------------*/
	/* Public.Properties
	-------------------------------*/
	prototype.offset = (new Date()).getTimezoneOffset() * 60000;
	
	/* Protected Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	/* Magic
	-------------------------------*/
	/* Public.Methods
	-------------------------------*/
	/**
	 * Returns Unix time
	 *
	 * @return number
	 */
	prototype.gmtNow = function() {
		return this.now() + this.offset;
	};
	
	/**
	 * Returns Unix time
	 *
	 * @return number
	 */
	prototype.now = function() {
		return (new Date).getTime();
	};
	
	/**
	 * Converts time to a readable formatted date
	 *
	 * @param int
	 * @param bool
	 * @param bool
	 * @return string
	 */
	prototype.toDate = function(time, addTime, longformat) {
		//Argument Testing
		argument
			.test(1, 'int')
			.test(2, 'bool', 'undefined')
			.test(3, 'bool', 'undefined');
		
		var date = new Date(parseInt(time));
		var day = date.getDate();

		if(day < 10) {
			day = '0'+day;
		}

		var month = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		if(longformat) {
			month = [
				'January',     'February',     'March',    'April',
				'May',          'June',         'July',     'August',
				'September',    'October',      'November', 'December'];
		}

		var localDate = month[date.getMonth()] + ' '+ day;

		if((new Date()).getFullYear() != date.getFullYear() || longformat) {
			localDate += ', '+ date.getFullYear();
		}

		if(addTime) {
			var hours = (date.getHours()) % 12;
			if(hours == 0) {
				hours = 12;
			}

			if(hours < 10) {
				hours = '0'+hours;
			}

			var seconds = date.getSeconds();

			if(seconds < 10) {
				seconds = '0'+seconds;
			}

			var am = date.getHours() > 12 ? 'PM' : 'AM';

			localDate += ' '+ hours + ':' + seconds + ' ' + am;
		}

		return localDate;
	};
	
	/**
	 * Converts time to a relative formatted date
	 *
	 * @param int
	 * @return string
	 */
	prototype.toRelative = function(time) {
		//Argument Testing
		argument.test(1, 'int');
		
		var dateNow	= new Date();
		var now 	= dateNow.getTime();

		var passed 	=  now - parseInt(time);

		var tokens 	= [
			[(1000 * 60 * 60 * 24 * 7), 'week'],
			[(1000 * 60 * 60 * 24), 'day'],
			[(1000 * 60 * 60), 'hour'],
			[(1000 * 60), 'minute'],
			[1000, 'second'],
			[-1000, 'second'],
			[-(1000 * 60), 'minute'],
			[-(1000 * 60 * 60), 'hour'],
			[-(1000 * 60 * 60 * 24), 'day'],
			[-(1000 * 60 * 60 * 24 * 7), 'week'],
			[-(1000 * 60 * 60 * 24 * 7 * 3), 'week'] ];
		
		if(passed > (tokens[0][0] * 3) || passed < (tokens[9][0] * 3)) {
			return this.toDate(time, false, true);
		}
		
		for(var prefix = '', suffix = '', i = 0; i < tokens.length; i++) {
			if(passed < tokens[i][0]) {
				continue;
			}
			
			if(tokens[i][0] < 0) {
				i--;
			}
			
			passed = Math.floor(passed / tokens[i][0]);
			
			
			if(tokens[i][1] == 'second' && -5 < passed && passed < 5) {
				return 'Now';
			} 
			
			if(tokens[i][1] == 'day' && passed == 1) {
				if(tokens[i][0] < 0) {
					return 'Tomorrow';
				}
				
				return 'Yesterday';
			} 
			
			prefix = tokens[i][0] < 0 ? 'in ': '';
			suffix = tokens[i][0] > 0 ? ' ago': '';

			return prefix + passed + ' ' + tokens[i][1]+(passed == 1 ? '' : 's')+suffix;
		}
		
		return this.toDate(time);
	};
	
	/**
	 * Converts GMT time to a relative formatted date
	 *
	 * @param int
	 * @return string
	 */
	prototype.toGMTRelative = function(time) {
		//Argument Testing
		argument.test(1, 'int');
		
		return this.toRelative(time - this.offset);
	};
	
	/* Protected Methods
	-------------------------------*/
	/* Private Methods
	-------------------------------*/
}).register('eden/string').singleton();