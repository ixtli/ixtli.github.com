/**
 * The main source file :)
 */


'use strict';



/**
 * @constructor
 */
function Ixtli()
{
	/** @type {jQuery} */
	this.topLevelContainer = null;

	/**
	 * The resume data itself as a lookupt table
	 * @type {Object}
	 * @const
	 */
	this.data = {

	};

	/**
	 * The order of the top level resume layout
	 * @type {Array.<string>}
	 * @const
	 */
	this.topLevelLayout = [
		'Experience', 'Education', 'Projects', 'Languages', 'Tools'
	];
}


/**
 * Initialize the global namespace object
 * @return {boolean} true if succesfully initialized
 */
Ixtli.prototype.init = function()
{
	this.topLevelContainer = $('div#tlc');
	$.ajax({
		'url': 'build/data.json',
		'context': this,
		'cache': false,
		'success': this.gotData,
		'error': this.failedToGetData
	});
	return true;
};


/**
 * Something went wrong with the request for data
 * @param  {jQuery.jqXHR} jqXHR the XHR request
 * @param  {string} textStatus  the text status returned by the request
 * @param  {string} errorThrown the HTTP error returned
 */
Ixtli.prototype.failedToGetData = function(jqXHR, textStatus, errorThrown)
{
	console.error('Something went wrong getting the data :(');
};


/**
 * JSON download of resume data succeeded
 * @param  {Object} data       the JSON data
 * @param  {string} textStatus the status of the request
 * @param  {jQuery.jqXHR} jqXHR      the request object
 */
Ixtli.prototype.gotData = function(data, textStatus, jqXHR)
{
	this.data = data;
	this.generateSections();
};


/**
 * Generates the top level DOM heirarchy in the order described by the
 * top level layout field
 */
Ixtli.prototype.generateSections = function()
{
	var items = this.topLevelLayout;
	var sectionCount = items.length;

	/** @type {jQuery} */
	var newSection;
	for (var i = 0; i < sectionCount; i++)
	{
		// Make the new section and configure it
		newSection = $('<div>', {'id': items[i]});

		// Add internal items
		newSection.append($('<h3>').html(items[i]));

		// Add it to the bottom of the top level container and wrap it
		this.topLevelContainer.append(newSection);
		newSection.wrap('<div class="row"></div>');
	}
};

// Bootstrap!
$(function() { window.ixtli = new Ixtli(); window.ixtli.init(); });
