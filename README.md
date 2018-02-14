HW1-part2_DEVOPS
===============

### Part 1: Provisioning the servers programmatically. 
For this part I provisioned the servers in Digital Ocean and Amazon Web Services - Elastic Compute Cloud. For digital ocean I used its API to create droplets an retrive its IP address. For AWS I used its sdk for nodejs to create instances and retrive th IP address.  
Here are the files containing the code to provision the servers-
1. Digital Ocean - https://github.ncsu.edu/uparikh/HW1-part2_DEVOPS/blob/master/DO-provision.js  
2. AWS - https://github.ncsu.edu/uparikh/HW1-part2_DEVOPS/blob/master/AWS-provision.js  
  
### Part 2: Configuration management to build the repo
For this part I have listed the basic software that needs to be present in the [requirements.txt](https://github.ncsu.edu/uparikh/HW1-part2_DEVOPS/blob/master/requirements.txt). It states that some packages like nodejs and npm must be present in the machine where the code is being executed. Additionally the file [package.json](https://github.ncsu.edu/uparikh/HW1-part2_DEVOPS/blob/master/package.json) contains some dependencies in the form of node packages and libraries.  
To execute the code from the terminal, follow these instructions-  
1. change directory to the directory of the repository.  
2. run the command npm install. This command installs the dependencies listed in the package.json file.
3. To run the AWS provisioning code, type the command  
```node AWS-provision.js```  
or type this command   
```npm run aws-provision```  
4. To run the DigitalOcean provisioning code, type the command  
```node DO-provision.js```  
or type this command   
```npm run do-provision```  
  
**Screencast link for the demo of the Homework -** https://youtu.be/XZOar6qIxyo  
  
### Part 3: Conceptual Questions  
  
Q1. Define idempotency. Give two examples of an idempotent operation and non-idempotent operation.  
Ans.  
Idempotency from the software point of view refers to a task or a function which when perform repetedly, produces the same results. That means multiple calls to that function doesn't change its outcome, it remains the same.
Examples of idempotent operations-  
* An HTTP GET request would be idempotent because it gives same result each time when called multiple times.  
* Almost all IO read commands are idempotent. For example read from a file is idempotent. It gives same result when called multiple times.  
Examples of non-idempotent operations-
* Many HTTP POST and DELETE requests aren't idempotent because for the case of DELETE if a value is deleted you can't do that same operation again as it will result in an error. Also for POST if we create a value which has a unique identifier like an id field, doing the same operation again would result in error because id needs to be unique.  
* A file append operation won't be idempotent. If we do it multiple times, the outcome changes as the same content gets appended multiple times.  
  
Q2. Describe several issues related to management of your inventory.  
Ans.  
Inventory for a software refers to the various resources it uses like - servers, ip addresses, SSH keys, API tokens, etc. Management of the inventory is an important task for building and maintaining a software. But its a challenging task and has many issues. Some of the issues related to inventory management are listed here -
* It isn't always easy to figure out a cost efficient way to deal with things and sometimes we end up spending more on irrelevent things which are rarely used.
* Some things like API tokens and SSH private keys need to be secure as if they are compromised, the outcome might be disastrous. Adding these security features require its own computation cost.
* One key feature of inventory is assigning Roles and previlages. We must figure out who has the access to how much amount of resources. This task is a bit difficult.
* Sometimes the people handling these resources might not be capable enough to handle them correctly. It may lead to errors and failures.  
  
Q3. Describe two configuration models. What are disadvantages and advantages of each model?  
Ans.  
The 2 types of configuration models are push based and pull based. In a push based model a server/master machine pushes a bunch of files over the server to the nodes and runs a script on them to update the configuratins. An example is Ansible. In a pull based model, the nodes poll the master/server machine periodically and independently for the updates. eg - puppet and chef.  
  
Advantages of push model -  
* Easier to manage
* All assets managed centrally.  
  
Disadvantages of push model -  
* It can be difficult to scale.
* Assets can drift from config  
  
Advantages of pull model -   
* Better at ensuring assets stay in sync with config.
* Easier to scale.  
  
Disadvantages of pull model -   
* It can be complex to implement. 
  
Q4. What are some of the consquences of not having proper configuration management?  
Ans.  
Configuration Management is a key aspect of Software Engineering. Major Software industries invest significant amount of money for it. It is alomst equally important to the software development itself. Poor configuration management may lead to some serious consequences. Some of the consquences of not having proper configuration management are -  
* One major issue it has is in onboarding where the code builds and runs successfully on one machine but not on the other one. If configuration management isn't proper, this condition may occur frequently. 
* The dependencies of the software keeps on getting updates regularly. Most of the times these updates are really useful as they may optimize it or may fix bugs. When the configuration management is poor, these updates might not be done and it may lead to poor performance.
* Regarding updates, not all updates are useful. Some updates might be unstable or have bugs. Having a good configuration management helps with that by rolling back to a previous stable version.
* Handing the configurations manually too is a sign of poor configuration management and it may lead to errors. Configuration management must be automated as much as possible.





