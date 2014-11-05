Gauss-Boaga 2 WGS84 converter
=============================

To install dependencies, as usual 

npm install

To run

node node [<input_file>="in.csv"] [<output_file>="out.csv"]

Given a CSV input file with columns "X" and "Y" of Gauss-Boaga coordinates, converts them to WGS Long/Lat and outputs the original CSV + the converted coordinates (output column names are "LAT" and "LONG").