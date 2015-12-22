import Ember from 'ember';

export default Ember.Component.extend({
  setMarkers: 'setMarkers',

  observeChangesToFile: function (evt) {
    this.send('readSingleFile', evt);
  }.on('change'),

  plotContents: function (string) {
    const parser = new window.DOMParser();
    const xmlContent = parser.parseFromString(string, 'text/xml');
    const coordinateHTMLElements = xmlContent.getElementsByTagName('trkpt')
    const coordinateArray = [].slice.call(coordinateHTMLElements);

    this.sendAction('setMarkers', coordinateArray);
  },



  actions: {
    readSingleFile: function(evt) {
      //Retrieve the first (and only!) File from the FileList object
      var file = evt.target.files[0];
      var self = this;

      if (file) {
        var r = new FileReader();
        var contents;
        r.onload = function(e) {
  	      contents = e.target.result;
          self.plotContents(contents);
        };
        r.readAsText(file);

      } else {
        alert("Failed to load file");
      }
    },


  }

});
