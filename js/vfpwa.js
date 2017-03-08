// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function () {
    'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
//    spinner: document.querySelector('.loader'),
//    cardTemplate: document.querySelector('.cardTemplate'),
//    container: document.querySelector('.main'),
//    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/


 app.updateHomeScreen = function(billData)
 {
     document.getElementById('bill-amount').textContent = billData.amount;
     document.getElementById('bill-date').textContent = billData.billPeriod;
     document.getElementById('bill-due-date').textContent = billData.dueData;
 };
    
  
  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
   * Gets a forecast for a specific city and updates the card with the data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  app.fetDataForHomePage = function() {
      var url = 'https://94191504.ngrok.io/eCareRestApp-Client-context-root/jersey/gil/bill2/puneet/sri';
    // TODO add cache logic here
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            results.key = key;
            results.label = label;
            results.created = json.query.created;
            //app.updateForecastCard(results, 'balance is 20.0');
          });
        }
      });
    }
      
    // Fetch the latest data.
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
          console.log('inside ready state' + request.status);
        if (request.status === 200) {
          var billData = JSON.parse(request.response);
            console.log('billData : ' + billData);
          //var results = request.response;
          app.updateHomeScreen(billData);
        }
      } else {
          console.log('readystate NOT DONE');
        // Return the initial weather forecast since no data is available.
        //app.updateForecastCard(initialWeatherForecast, 'balance is 20.0 else2 ');
      }
    };
    //console.log('about to ')
    request.open('GET', url);
    request.send();
  };

 
var dummyBillData = {
    amount : '56.00',
    lastBillAmount: '26.00',
    dueData : '12 Mar 2017 - dummy',
    billPeriod : '2 Feb - 1 Mar 2017'
}; 
    
    
  // TODO uncomment line below to test app with fake data
  // app.updateForecastCard(initialWeatherForecast);

    
  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add startup code here
//  app.selectedCities = localStorage.selectedCities;
//  if (app.selectedCities) {
//    app.selectedCities = JSON.parse(app.selectedCities);
//    app.selectedCities.forEach(function(city) {
//      app.getForecast(city.key, city.label);
//    });
//  } else {
//    /* The user is using the app for the first time, or the user has not
//     * saved any cities, so show the user some fake data. A real app in this
//     * scenario could guess the user's location via IP lookup and then inject
//     * that data into the page.
//     */
//    app.updateForecastCard(initialWeatherForecast);
//    app.selectedCities = [
//      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
//    ];
//    app.saveSelectedCities();
//  }
    app.updateHomeScreen(dummyBillData);
    app.fetDataForHomePage();

})();
