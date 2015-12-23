import Ember from 'ember';

export default Ember.Component.extend({
  createTableOfPoints: function() {
    this.set('tableData', [])
    if (!Ember.isEmpty(this.get('markerData')) && !Ember.isEmpty(this.get('elevationData'))) {
      const data = [];
      const coordPoints = this.get('markerData');
      const elevationData = this.get('elevationData');

      coordPoints.forEach(function(point, idx){
        data.pushObject({ lat: point.lat,
                          lng: point.lng,
                          elevation: elevationData[idx]['yValue']
                        });
      });

      this.set("tableData", data);
    }
  }.observes('markerData', 'elevationData'),

  calculateTotalDistance: function() {
    if (this.get('markerData')) {
      var coordinateData = this.get('markerData');
      var self = this;

      var totalDistance = 0;
      coordinateData.forEach(function(point, idx) {
        const nextIndex = idx + 1
        const comparisonPt = coordinateData[nextIndex];
        if (comparisonPt) {
          const distance = self.getDistanceFromLatLonInKm(point.lat, point.lng, comparisonPt.lat, comparisonPt.lng);
          totalDistance += distance;
        } else {
          return;
        }
      });

      this.set('routeTotalDistance', Math.round(totalDistance));
    }
  }.observes('markerData'),

  getDistanceFromLatLonInKm: function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  },

  deg2rad: function(deg) {
    return deg * (Math.PI/180)
  }
});
