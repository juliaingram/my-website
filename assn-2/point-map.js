mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFpbmdyYW0iLCJhIjoiY2t3d2d6MGQ0MDNqbTJwbGM0NndvN3hxayJ9.99_9XH0Yyi4ejYRE19Tgjw';
var pointMap = new mapboxgl.Map({
  container: "point-map",
  style: 'mapbox://styles/juliaingram/cl41rr28f000k16ny2vtmmmni',
  zoom: 1.1,
  maxZoom: 9,
  minZoom: 0,
  center: [30, 30],
  projection: 'mercator',
});

pointMap.on("load", function () {
  pointMap.addLayer(
    {
      id: "disaster-points",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/disasters.geojson",
      },
      paint: {
          'circle-radius':
          ['interpolate', ['linear'], ['zoom'],
            3, ["*", ["get", "level"], 1.5],
            9, ["*", ["get", "level"], 3],
          ],
          "circle-color": [
          "match",
          ["get", "disastertype"],
          "flood",
          "#41BBD9",
          "storm",
          "#82ABA1",
          "drought",
          "#A6A57A",
          "earthquake",
          "#99C24D",
          "extreme temperature ", //space intentional
          "#FFA500",
          "mass movement (dry)",
          "#140F2D",
          "landslide",
          "#C1CC99",
          "volcanic activity",
          "#A33B20",
          "#ffffff",
          ],
          "circle-stroke-color": "#000000",
          "circle-opacity": ["/", ["-", ["get", "year"], 1959], 100],
        },
      },
      "waterway-label"
  );
  pointMap.addLayer(
      {
        id: "country-outlines",
        type: "line",
        source: {
          type: "geojson",
          data: "data/disasters.geojson",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 0.7,
        },
      },
      "disaster-points" // Here's where we tell Mapbox where to slot this new layer
    );
});

pointMap.on('click', 'disaster-points', function (e) {
  console.log("click")
  var countryName = e.features[0].properties.country;
  var level = e.features[0].properties.level;
  var type = e.features[0].properties.disastertype;
  var year = e.features[0].properties.year;
  type = type.charAt(0).toUpperCase() + type.slice(1)
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countryName + '</h4>'
          + '<h2>' + type + '</h2>'
          + '<p> Level ' + level + ' disaster (' + year + ')</p>')
      .addTo(pointMap);
});
pointMap.on('mouseenter', 'disaster-points', function () {
  pointMap.getCanvas().style.cursor = 'pointer';
});
pointMap.on('mouseleave', 'disaster-points', function () {
  pointMap.getCanvas().style.cursor = '';
});
