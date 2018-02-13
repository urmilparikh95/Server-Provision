var needle = require("needle");
var os = require("os");

var config = {};
config.token = process.env.do_token;
//console.log("Your token is:", config.token);

var headers = {
	'Content-Type': 'application/json',
	Authorization: 'Bearer ' + config.token
};

var client = {
	getIP: function (id, onResponse) {
		needle.get("https://api.digitalocean.com/v2/droplets/" + id, {
			headers: headers
		}, onResponse)
	},

	createDroplet: function (dropletName, region, imageName, onResponse) {
		var data = {
			"name": dropletName,
			"region": region,
			"size": "512mb",
			"image": imageName,
			// Id to ssh_key already associated with my account. - so that it can be used for ssh
			"ssh_keys": [18318864],
			"backups": false,
			"ipv6": false,
			"user_data": null,
			"private_networking": null
		};

		console.log("Attempting to create: " + JSON.stringify(data));

		needle.post("https://api.digitalocean.com/v2/droplets", data, {
			headers: headers,
			json: true
		}, onResponse);

	}
};

// #############################################
// Create an droplet with the specified name, region, and image and then print its IP by fetching its id.
// #############################################
var name = "uparikh" + os.hostname();
var region = "nyc1"; // the data center for our droplet
var image = "ubuntu-16-04-x64"; // the image for our droplet
var dropletId;
var ip;
client.createDroplet(name, region, image, function (err, resp, body) {
	//console.log(body);
	// StatusCode 202 - Means server accepted request.
	if (!err && resp.statusCode == 202) {
		dropletId = body.droplet.id;
		console.log("Droplet " + body.droplet.name + " created");
		client.getIP(dropletId, function (error, response) {
			var data = response.body;
			ip = response.body.droplet.networks.v4[0].ip_address;
			console.log("The public IP address of the droplet is " + ip);
		});
	}
});