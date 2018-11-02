Re:Life
======
SSH
18.179.32.241
- ssh -i "service/lanwayrelife.pem" centos@ec2-18-179-32-241.ap-northeast-1.compute.amazonaws.com

Build the Stack
- This can take a while, especially the first time you run this particular command on your development system:

$ docker-compose -f local.yml build
Generally, if you want to emulate production environment use production.yml instead.
And this is true for any other actions you might need to perform: whenever a switch is required, just do it!

Run the Stack
This brings up both Django and MySql.
The first time it is run it might take a while to get started, but subsequent runs will occur quickly.

Open a terminal at the project root and run the following for local development:

- docker-compose -f local.yml up

You can also set the environment variable COMPOSE_FILE pointing to local.yml like this:

- export COMPOSE_FILE=local.yml
- export COMPOSE_FILE=production.yml

And then run:

- docker-compose build

To run in a detached (background) mode, just:

- docker-compose up -d


Building & Running Production Stack
You will need to build the stack first. To do that, run:

- docker-compose -f production.yml build
Once this is ready, you can run it with:

- docker-compose -f production.yml up

To run the stack and detach the containers, run:

- docker-compose -f production.yml up -d

To run a migration, open up a second terminal and run:

- docker-compose run --rm django python manage.py makemigrations
- docker-compose run --rm django python manage.py migrate

To create a superuser, run:

- docker-compose -f production.yml run --rm django python manage.py createsuperuser

If you need a shell, run:

- docker-compose -f production.yml run --rm django python manage.py shell

To check the logs out, run:

- docker-compose -f production.yml logs

- docker exec -it dev_mysql_1 bash -l

- find . -name __pycache__  -type d -exec rm -rf {} \;

- docker ps -aq

- docker stop $(docker ps -aq)

- docker rm $(docker ps -aq) -f

- docker rmi $(docker images -q)

- docker restart dev_nginx_1