set -x
docker rm -f blog
docker build -f Dockerfile -t blog .
docker run --name blog --network blog -d blog
