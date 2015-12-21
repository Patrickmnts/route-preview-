import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    plotPoints: function (lat, lng) {
      const mark = { id: 1,
                     lat: lat,
                     lng: lng
                   }
                   
      this.set('markers', [mark]);
    }
  }
});
