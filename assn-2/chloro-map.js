mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFpbmdyYW0iLCJhIjoiY2t3d2d6MGQ0MDNqbTJwbGM0NndvN3hxayJ9.99_9XH0Yyi4ejYRE19Tgjw';
var map = new mapboxgl.Map({
    container: 'chloro-map',
    style: 'mapbox://styles/juliaingram/cl41rr28f000k16ny2vtmmmni',
    zoom: 3,
    maxZoom: 9,
    minZoom: 3.5,
    center: [-99, 38],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
});

map.on("load", function () {
  map.addLayer(
    {
      id: "us_counties_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.25,
      },
    },
    "waterway-label"
  );
  map.addLayer(
    {
      id: "us_counties_type",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic Types Type_2015_Update non-overlapping"],
          0,
          "#7fc97f",
          1,
          "#beaed4",
          2,
          "#fdc086",
          3,
          "#ffff99",
          4,
          "#386cb0",
          5,
          "#f0027f",
          "#ffffff",
        ],
        "fill-outline-color": "#000000",
        // "fill-opacity": [
        //   "match",
        //   ["get", "Low_Employment_Cnty_2008_2012_25_64"],
        //   0, 
        //   0.5,
        //   1, 
        //   1,
        // ],
      },
    },
    "us_counties_outline"
  );
});

map.on("click", "us_states_elections", function (e) {
  var stateName = e.features[0].properties.State;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stateName +
        "</h4>" +
        "<h2>" +
        winner +
        "</h2>" +
        "<p>" +
        wnrPerc +
        "% - (" +
        totalVotes +
        " votes)</p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "us_states_elections", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "us_states_elections", function () {
  map.getCanvas().style.cursor = "";
});

map.on("click", "us_counties_type", function (e) {
  var stateName = e.features[0].properties.STATE_NAME;
  var countyName = e.features[0].properties.NAME;
  var ersType = e.features[0].properties.Economic_Type_Label;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        countyName +
        ", " +
        stateName +
        "</h4>" +
        "<h2>" +
        ersType +
        "</h2>" +
        "<p>"
    )
    .addTo(map);
});
map.on("mouseenter", "us_counties_type", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "us_counties_type", function () {
  map.getCanvas().style.cursor = "";
});