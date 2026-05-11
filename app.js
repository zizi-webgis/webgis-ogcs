// =======================
// BASEMAP
// =======================

const osm = new ol.layer.Tile({

  source: new ol.source.OSM()

});


// =======================
// WMS LAYER
// =======================

const wmsLayer = new ol.layer.Tile({

  source: new ol.source.TileWMS({

    url: 'https://ahocevar.com/geoserver/wms',

    params: {

      'LAYERS': 'topp:states',

      'TILED': true

    },

    serverType: 'geoserver'

  }),

  opacity: 0.5

});


// =======================
// WFS SOURCE
// =======================

const vectorSource = new ol.source.Vector({

  format: new ol.format.GeoJSON(),

  url:

    'https://ahocevar.com/geoserver/wfs?' +

    'service=WFS&' +

    'version=1.1.0&' +

    'request=GetFeature&' +

    'typename=topp:states&' +

    'outputFormat=application/json',

});


// =======================
// WFS LAYER
// =======================

const wfsLayer = new ol.layer.Vector({

  source: vectorSource,

  style: new ol.style.Style({

    stroke: new ol.style.Stroke({

      color: 'red',

      width: 2

    }),

    fill: new ol.style.Fill({

      color: 'rgba(255,0,0,0.1)'

    })

  })

});


// =======================
// MAP
// =======================

const map = new ol.Map({

  target: 'map',

  layers: [

    osm,
    wmsLayer,
    wfsLayer

  ],

  view: new ol.View({

    center:

      ol.proj.fromLonLat([

        -100,
        40

      ]),

    zoom: 4

  })

});


// =======================
// POPUP
// =======================

const popup =

  document.getElementById(
    'popup'
  );


map.on(

  'singleclick',

  function(evt) {

    let found = false;

    map.forEachFeatureAtPixel(

      evt.pixel,

      function(feature) {

        found = true;

        const props =
          feature.getProperties();

        let html = '';

        for (let key in props) {

          if (key !== 'geometry') {

            html +=

              '<b>' +
              key +
              '</b>: ' +

              props[key] +

              '<br>';

          }

        }

        popup.innerHTML =
          html;

        popup.style.left =
          evt.pixel[0] + 'px';

        popup.style.top =
          evt.pixel[1] + 'px';

        popup.style.display =
          'block';

      }

    );

    if (!found) {

      popup.style.display =
        'none';

    }

  }

);


// =======================
// TOGGLE WMS
// =======================

document
.getElementById(
  'toggleWMS'
)
.addEventListener(

  'change',

  function() {

    wmsLayer.setVisible(
      this.checked
    );

  }

);


// =======================
// TOGGLE WFS
// =======================

document
.getElementById(
  'toggleWFS'
)
.addEventListener(

  'change',

  function() {

    wfsLayer.setVisible(
      this.checked
    );

  }

);