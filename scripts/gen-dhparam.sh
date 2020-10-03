#!/bin/bash
# Generate Diffie-Hellman key
mkdir -p ../dhparam
sudo openssl dhparam -out ../dhparam/dhparam-2048.pem 2048
