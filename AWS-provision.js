var AWS = require('aws-sdk');

var config = new AWS.Config({
  accessKeyId: process.env.aws_access_key,
  secretAccessKey: process.env.aws_secret_key,
  region: 'us-east-1' //north virginia region
});
//console.log("Your access key id is:" + process.env.aws_access_key + " password: " + process.env.aws_secret_key);
AWS.config = config;
var ec2 = new AWS.EC2({
  apiVersion: '2016-11-15'
});
var params = {
  MaxCount: 1,
  MinCount: 1,
  ImageId: 'ami-97785bed', // the amazon linux image for our region
  InstanceType: 't2.micro', // the one available for free tier
  KeyName: 'csc519', // assign a keypair for ssh 
  SecurityGroups: [ // assign security group for ssh
    'csc519'
  ],
  TagSpecifications: [{
    ResourceType: 'instance',
    Tags: [{
      Key: 'Name',
      Value: 'instance001'
    }]
  }]
};
var ip;
ec2.runInstances(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    //console.log(data);
    var instance = data.Instances[0]; // we're creating only one instance
    console.log("Creating instance with " + instance.ImageId);
    var instanceId = instance.InstanceId;
    console.log("Instance id is " + instanceId);
    ec2.waitFor('instanceRunning', {
      InstanceIds: [instanceId]
    }, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        console.log("The instance is now running");
        ip = data.Reservations[0].Instances[0].PublicIpAddress;
        console.log("The public IPv4 address of the instance is " + ip);
      }
    });
  }
});