import Ember from 'ember';

export default Ember.Controller.extend({
  focusMap: function (midpoint) {
    const midObj = this.get('markers')[midpoint];
    this.setProperties({ lat: midObj.lat,
                         lng: midObj.lng
                      });
  },

  actions: {
    clearRoute: function() {
      this.setProperties({ markers: [],
                           elevationData: []
                        });
    },

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

      coordinateArray.forEach(function(point, idx) {
          const lat = $(point).attr('lat');
          const lng = $(point).attr('lon');

        if ( idx % 10 === 0 ) {
          routePoints.pushObject({ id: idx,
                                   lat: lat,
                                   lng: lng
                                 });
        }
      });

      this.set('markers', routePoints);

      const midPoint = (routePoints.length / 2);
      this.focusMap(midPoint);
    },

    setElevation: function (elevationArray) {
      const elevationPoints = [];
      elevationArray.forEach(function(point, idx) {
        const ele = $(point).text();
        if (idx % 10 === 0) {
          elevationPoints.pushObject({ xValue: Number(idx), yValue: Number(ele), group: 'elevation'});
        }
      });

      this.set('elevationData', elevationPoints);
    }
  }
});
