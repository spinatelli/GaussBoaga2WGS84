var proj4 = require('proj4')
  , csv = require('fast-csv')
  , fs = require('fs');

var GAUSS_BOAGA = '+proj=tmerc +ellps=intl +lat_0=0 +lon_0=9+x_0=1500000 +y_0=0 +k=0.9996 +towgs84=-225,-65,9,0,0,0,0';
var WGS84 = "+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees";

var inFile = process.argv[2] || 'in.csv';
var outFile = process.argv[3] || 'out.csv';

process.on('uncaughtException', function(err) {
    console.log('ERROR: '+err.message);
    console.log('Input file is probably not existing');
});

csv
  .fromPath(inFile, {headers: true})
  .transform(function(obj) {
    var long_lat = proj4(GAUSS_BOAGA, WGS84, [obj.X,obj.Y]);
    obj.LONG = long_lat[0];
    obj.LAT = long_lat[1];
    return obj;
  })
  .pipe(csv.createWriteStream({headers: true}))
  .pipe(fs.createWriteStream(outFile, {encoding: "utf8"}));
