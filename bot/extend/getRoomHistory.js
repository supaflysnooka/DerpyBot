'use strict';
const _ = require('lodash');

/***********************************************************************
 * This module grabs the playlist history from a room
 * It uses JS Generators so make sure your Node version supports it
 * http://node.green/#generators
 * node >= 4.3.2 
 **/

/***********************************************************************
 * Stubs for parts of DubAPI
 **/

var endpoints = {
  roomPlaylistHistory : 'room/%RID%/playlist/history?page=%PAGENUM%'
};

function DubAPIRequestError(code, endpoint) {
    Error.captureStackTrace(this);
    this.name = 'DubAPIRequestError';
    this.message = 'Response ' + code + ' from ' + endpoint;
}

DubAPIRequestError.prototype = Object.create(Error.prototype);

function DubAPIError(message) {
    Error.captureStackTrace(this);
    this.name = 'DubAPIError';
    this.message = message || '';
}

DubAPIError.prototype = Object.create(Error.prototype);

/************************************************************************/

/**
 * return array sequential history endpoints
 * @param  {string} roomID  the RoomID (might be an int, I'm not sure. doesnt matter)
 * @param  {integer} pages  total number of history pages desired
 * @return {array}          Array of url strings
 */
function makeRequestArray(roomID, pages) {
  var url = endpoints.roomPlaylistHistory.replace('%RID%', roomID);
  var result = [];
  for (var i=1; i <= pages; i++){
    result.push(url.replace('%PAGENUM%', i));
  }
  return result;
}

// store our module-scoped generator
var hist;

/**
 * Make requests to url and return results to yield
 * @param  {Object} context "this" of DubAPI
 * @param  {String} url     The url to make GET request to
 */
function requestWrapper(context, url) {
  context._.reqHandler.queue({method: 'GET', url: url}, function(code, body) {
    if (code !== 200) {
        context.emit('error', new DubAPIRequestError(code, url));
        hist.next( null );
      } else {
        hist.next( body.data );
      }
  } );
}

/**
 * Main Generator function to iterate over array at our own pace
 * @param {Object} context       the "this" of the DubAPI 
 * @param {Array} reqArray       the array of history urls that we will be calling
 * @param {Function} doneCB      on complete, this will be exec passing history[] to it
 */
function *History(context, reqArray, doneCB) {
  var history = [];

  for (var i = 0; i < reqArray.length; i++){
    var result = yield requestWrapper( context, reqArray[i] );
    if (result) {
      history = history.concat(result);
    }
  }
  if (typeof doneCB === 'function') {
    doneCB(history);
  }
}


/**
 * API for module. This is what you will be calling externally
 * @param  {int}   pages       number of pages of history to retrieve
 * @param  {Function} callback when all history pages are retrieved, this funciton will be run
 */
function getRoomHistory(pages, callback){
  /* jshint validthis:true */
  if (!this._.connected){ return false; }

  // make sure we can get roomid
  var roomid = _.get(this, '_.room.id');
  if (!roomid) { return false; }

  // make an array of urls to iterate requests
  var reqs = makeRequestArray(roomid, pages);

  // start History generator function
  hist = new History(this, reqs, callback);
  hist.next();
}


module.exports = getRoomHistory;
