 const markersList = [
    {
      lat: 42.65066059999999,
      lng: 18.0944238,
      label: 'Dubrovnik, Croatia'
    },
    {
      lat: 53.348155,
      lng: -6.256794999999999,
      label: 'Dublin, Ireland'
    },
    {
      lat: 46.5734348,
      lng: 11.6742025,
      label: 'St. Ulrich, Italy'
    },
    {
      lat: 67.8557995,
      lng: 20.225282,
      label: 'Kiruna, Sweden'
    },
    {
      lat: 52.3679843,
      lng: 4.9035614,
      label: 'Amsterdam, The Netherlands'
    },
    {
      lat: 52.52000659999999,
      lng: 13.404954,
      label: 'Berlin, Germany'
    },
    {
      lat: 47.4916945,
      lng: 11.0954984,
      label: 'Garmische-Partenkirchen, Germany'
    },
    {
      lat: 55.6760968,
      lng: 12.5683372,
      label: 'Copenhagen, Denmark'
    },
    {
      lat: 48.856614,
      lng: 2.3522219,
      label: 'Paris, France'
    },
    {
      lat: 41.9027835,
      lng: 12.4963655,
      label: 'Rome, Italy'
    },
    {
      lat: 47.4979,
      lng: 19.0402,
      label: 'Budapest, Hungary'
    },
    {
      lat: 52.9719,
      lng: -9.4265,
      label: 'Cliffs of Moher, Ireland'
    },
    {
      lat: 47.6302,
      lng: 9.6544,
      label: 'Berchtesgaden, Germany'
    },
    {
      lat: 59.3293,
      lng: 18.0686,
      label: 'Stockholm, Sweden'
    },
    {
      lat: 50.0755,
      lng: 14.4378,
      label: 'Prague, Czech Republic'
    },
    {
      lat: 44.1488,
      lng: 9.6544,
      label: 'Monterosso al Mare, Italy'
    }
  ]

  // MotorYoga style from snazzymaps https://snazzymaps.com/style/135866/motoryoga
    const styles = [
      {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "-100"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "simplified"
          },
          {
            "color": "#ff8000"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
          {
            "hue": "#ff8000"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 65
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": "50"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "-100"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
          {
            "lightness": "30"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
          {
            "lightness": "40"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#fafafa"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": -25
          },
          {
            "saturation": -97
          },
          {
            "color": "#c9dbcb"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          {
            "lightness": -25
          },
          {
            "saturation": -100
          }
        ]
      }
    ]

  export { markersList,styles }