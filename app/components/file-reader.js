import Ember from 'ember';

export default Ember.Component.extend({
  setMarkers: 'setMarkers',

  observeChangesToFile: function (evt) {
    this.send('readSingleFile', evt);
  }.on('change'),

  parseFile: function (string) {
    const parser = new window.DOMParser();
    const xmlContent = parser.parseFromString(string, 'text/xml');

    this.plotContents(xmlContent);
    this.plotElevation(xmlContent);
  },

  plotContents: function (xmlContent) {
    const coordinateHTMLElements = xmlContent.getElementsByTagName('trkpt')
    const coordinateArray = [].slice.call(coordinateHTMLElements);

    this.sendAction('setMarkers', coordinateArray);
  },

  plotElevation: function (xmlContent) {
    const elevationHTMLElements = xmlContent.getElementsByTagName('ele');
    const elevationArray = [].slice.call(elevationHTMLElements);

    this.sendAction('setElevation', elevationArray);
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
          self.parseFile(contents);
        };
        r.readAsText(file);

      } else {
        alert("Failed to load file");
      }
    },


  }

});
