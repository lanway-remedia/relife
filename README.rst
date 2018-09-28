Re:Life
======
SSH
- ssh -i "lanwayrelife.pem" centos@ec2-18-179-32-241.ap-northeast-1.compute.amazonaws.com

Build the Stack
- This can take a while, especially the first time you run this particular command on your development system:

$ docker-compose -f local.yml build
Generally, if you want to emulate production environment use production.yml instead.
And this is true for any other actions you might need to perform: whenever a switch is required, just do it!

Run the Stack
This brings up both Django and PostgreSQL.
The first time it is run it might take a while to get started, but subsequent runs will occur quickly.

Open a terminal at the project root and run the following for local development:

- docker-compose -f local.yml up

You can also set the environment variable COMPOSE_FILE pointing to local.yml like this:

- export COMPOSE_FILE=local.yml
- export COMPOSE_FILE=production.yml

And then run:

- docker-compose up

To run in a detached (background) mode, just:

- docker-compose up -d