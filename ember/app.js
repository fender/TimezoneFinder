App = Ember.Application.create();

// Define our custom routes.
App.Router.map(function() {
  this.route("list");
});

// Local data store.
var cities = [
  { name: 'London', timezone: 'GMT' },
  { name: 'Tokyo', timezone: 'JST' },
  { name: 'Melbourne', timezone: 'EDT' },
  { name: 'Los Angeles', timezone: 'PST' },
  { name: 'New York', timezone: 'EST' }
];

// Provide cities as the model for the index (i.e. default) route.
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return cities;
  }
});

// Provide cities as the model for the list route.
App.ListRoute = Ember.Route.extend({
  model: function() {
    return cities;
  }
});