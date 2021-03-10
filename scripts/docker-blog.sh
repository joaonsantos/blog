set -x
docker rm -f blog
docker network rm frontend
docker network create frontend
docker network connect frontend backend
docker build -f Dockerfile -t blog .
docker run --name blog --network frontend -p 3000:80 -d blog
