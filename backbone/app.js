// Define our model and default values.
var City = Backbone.Model.extend({
  defaults: {
    id: '',
    timezone: ''
  }
});

// Define our collection.
var CitiesCollection = Backbone.Collection.extend({
  model: City
});

// Create our collection of cities.
var citiesCollection = new CitiesCollection([
  { id: 'London', timezone: 'GMT' },
  { id: 'Tokyo', timezone: 'JST' },
  { id: 'Melbourne', timezone: 'EDT' },
  { id: 'Los Angeles', timezone: 'PST' },
  { id: 'New York', timezone: 'EST' }
]);

// This view renders a select element containing the different cities. When a
// city is selected a message outputs the relative timezone.
var SelectCityView = Backbone.View.extend({
  // This is the DOM element the view will be rendered within.
  tagName: 'div',

  // Declare templates required for this view.
  template: _.template(
    '<p>Hello world! Welcome to Timezone Finder.</p>' +
    '<label>Select a city</label>' +
    '<select id="cities"></select>' +
    '<p id="message"></p>'
  ),

  option_template: _.template('<option value="<%= id %>"><%= id %></option>'),

  message_template: _.template('<p>The timezone in <%= id %> is <%= timezone %>.</p>'),

  // This is automatically called when the view is created.
  initialize: function() {
    this.render();
    this.renderMessage();
  },

  // Renders our view and the select element.
  render: function() {
    this.$el.html(this.template());
    _.each(this.collection.models, function(item) {
      var option = this.option_template(item.toJSON());
      this.$el.find('#cities').append(option);
    }, this);
    return this;
  },

  // Renders the selected city message.
  renderMessage: function() {
    var message = this.message_template(this.model.toJSON());
    this.$el.find('#message').html(message);
    return this;
  },

  // Listens to the 'change' event on our select element.
  events: {
    "change #cities": "citySelected"
  },

  // When a city is selected we update the message.
  citySelected: function() {
    var id = this.$el.find('#cities').val();
    this.model = this.collection.get(id);
    this.renderMessage();
  }
});

// This view renders a list of all cities and their timezones.
var CityListView = Backbone.View.extend({
  tagName: 'div',

  template: _.template('<h1>Full List</h1>' +
    '<div id="list"></div>'
  ),

  message_template: _.template('<p>The timezone in <%= id %> is <%= timezone %>.</p>'),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    _.each(this.collection.models, function(item) {
      var message = this.message_template(item.toJSON());
      this.$el.find('#list').append(message);
    }, this);
    return this;
  },
});

// Defines our Router which is responsible for handling the switching between
// our various content views.
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'showWelcome',
    list: 'showList'
  },

  showWelcome: function() {
    var selectCityView = new SelectCityView({
      collection: citiesCollection,
      model: citiesCollection.get('London')
    });
    this.showView(selectCityView);
  },

  showList: function() {
    var cityListView = new CityListView({
      collection: citiesCollection
    });
    this.showView(cityListView);
  },

  showView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
      this.currentView.unbind();
    }

    this.currentView = view;
    $('#view').html(this.currentView.el);
  }
});

// Wait for the DOM to be ready before creating our view.
$(document).ready(function() {
  Backbone.history.start({
    pushState: true
  });

  // Create our Router and automatically show the welcome view.
  var appRouter = new AppRouter;
  appRouter.showWelcome();

  // Capture menu item clicks to trigger route changes.
  $('#menu a').click(function(e) {
    e.preventDefault();
    appRouter.navigate($(this).attr('href'), {trigger: true});
  });
});
