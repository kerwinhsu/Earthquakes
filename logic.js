var map = L.map('map', {
  center: [37.0902, 95.7129],
  minzoom:1,
  maxzoom:1,
  zoom:3,

})

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

function chooseColor(mag) {
  switch (mag) {
    case "mag>=1 or mag<=2":
      return "purple";
    case "mag>=2 or mag<=3":
      return "green";
    case "mag>=3 or mag<=4":
      return "blue";
    case "mag>=4 or mag<=5":
      return "black";
    case "mag>=5":
      return "red";

  }
}

d3.json(queryUrl).then(function(data) {
  console.log(data);

  var geoJsonMarkerOptions = {
    radius: 5,
    fillcolor: "#ff7800",//chooseColor,
    color: "black",
    weigh: 0.5,
    fillOpacity: 0.10
  };
  L.geoJSON(data, {
    // style: function(feature) {
    //   return geoJsonMarkerOptions
    // },
    // pointToLayer: function (feature, latlng) {
    //   return L.circleMarker(latlng);
    // },
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 10,
        fillcolor: "#ff7800",//chooseColor,
        color: chooseColor(feature.properties.mag),
        weigh: 0.5,
        fillOpacity: 0.10
      });
    },
      // onEachFeature: function (feature, layer) {
      //   layer.bindPopup("<h2>" + feature.properties.place + "</h1> <hr> <h2>" + feature.properties.mag + "</h2>");
      // }
  }).addTo(map);
});

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: function (event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },

    mouseout: function (event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5
      });
    },
    click: function (event) {
      map.fitBounds(event.target.getBounds());

    }

  });
};

  //  var marker=L.marker([37.0902 , -95.7129 ], markerOptions);

    //var markerOptions={
      //fillcolor:chooseColor,
      //radius:5,
      //color:"black",
      //weight:0.5,
      //opacity:0.5
    //}

   // marker.addTo(map);
  // });
