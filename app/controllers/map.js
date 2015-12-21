import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    plotPoints: function (lat, lng) {
      const id = this.get('markers.length')
      const mark = { id: id,
                     lat: lat,
                     lng: lng
                   }

      this.get('markers').pushObject(mark);
    }
  }
});
