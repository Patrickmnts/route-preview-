import Ember from 'ember';

export default Ember.Controller.extend({
  focusMap: function (midpoint) {
    const midObj = this.get('markers')[midpoint];
    this.setProperties({ lat: midObj.lat,
                         lng: midObj.lng
                      });
  },

  actions: {
    setMapType: function (type) {
      this.set('mapType', type);
    },

    plotPoints: function (lat, lng) {
      const id = this.get('markers.length');
      const mark = { id: id,
                     lat: lat,
                     lng: lng
                   };

      this.get('markers').pushObject(mark);
    },

    setMarkers: function (coordinateArray) {
      const routePoints = [];

      coordinateArray.forEach(function(point) {
        const lat = $(point).attr('lat');
        const lng = $(point).attr('lon');

        routePoints.pushObject({ lat: lat, lng: lng });
      });

      this.set('markers', routePoints);

      const midPoint = (coordinateArray.length / 2);
      this.focusMap(midPoint);
    },

    setElevation: function (elevationArray) {
      this.set('elevationData', elevationArray);
    }
  }
});
