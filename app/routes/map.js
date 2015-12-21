import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function (controller) {
    controller.setProperties({
      lat: 45.4907965,
      lng: -122.613058,
      zoom: 11
     });
  }
});
