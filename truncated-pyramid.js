/*
  Truncated Pyramid shape generator for Tinkercad
  by György Balássy 
  (https://www.tinkercad.com/users/7Xg8htCbf0L-gyorgy-balassy)
  (http://www.thingiverse.com/balassy)

  Available at https://api.tinkercad.com/libraries/gYO23fKQzgi/0/docs/index.html.
*/

// Convenience declarations for dependencies.
var Mesh3D = Core.Mesh3D;
var Solid = Core.Solid;

// Parameters for the user interface.
params = [
	{
		"id": "baseWidth",
		"displayName": "Base Width",
		"type": "length",
		"rangeMin": 0,
		"rangeMax": 200,
		"default": 80
	},
	{
		"id": "topWidth",
		"displayName": "Top Width",
		"type": "length",
		"rangeMin": 0,
		"rangeMax": 200,
		"default": 60
	},
	{
		"id": "height",
		"displayName": "Height",
		"type": "length",
		"rangeMin": 0,
		"rangeMax": 200,
		"default": 20
	}
];

function process(params) { 
  // Parse the parameters.
  var baseWidth = params["baseWidth"];
  var topWidth = params["topWidth"];
  var height = params["height"];  
  
  // Calculate the vertices.
  var delta = (baseWidth - topWidth) / 2;
  
  // Base.
  var baseFarRight = [baseWidth, baseWidth, 0];
  var baseFarLeft = [0, baseWidth, 0];
  var baseNearLeft = [0, 0, 0];
  var baseNearRight = [baseWidth, 0, 0];
  
  // Top.
  var topFarRight = [baseWidth - delta, baseWidth - delta, height];
  var topFarLeft = [delta, baseWidth - delta, height];
  var topNearLeft = [delta, delta, height];
  var topNearRight = [baseWidth - delta, delta, height];
  
  // Create the faces.
  var mesh = new Mesh3D();
  
  mesh.quad(baseFarRight, baseFarLeft, baseNearLeft, baseNearRight);    // Base.  
  mesh.quad(topFarRight, topFarLeft, topNearLeft, topNearRight);        // Top.  
  mesh.quad(topFarLeft, baseFarLeft, baseNearLeft, topNearLeft);        // Left face.  
  mesh.quad(topFarRight, topNearRight, baseNearRight, baseFarRight);    // Right face.  
  mesh.quad(topFarRight, topFarLeft, baseFarLeft, baseFarRight);        // Far face.  
  mesh.quad(topNearRight, topNearLeft, baseNearLeft, baseNearRight);    // Near face.
  
  return Solid.make(mesh);
}