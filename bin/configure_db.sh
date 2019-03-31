#!/bin/bash

echo "Configuring dragonstackdb"

sudo -u postgres dropdb dragonstackdb
sudo -u postgres createdb --owner=node_user dragonstackdb

declare -a sqlArr
for file in ./bin/sql/*.sql 
do
    sqlArr=("${sqlArr[@]}" "$file")
    for item in "${sqlArr[@]}" 
    do
        sudo PGPASSWORD=$DRAGON_PW -u postgres psql -h localhost -U node_user -d dragonstackdb < $item
    done
done

node ./bin/insertTraits.js

echo "dragonstackdb configured"