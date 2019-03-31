#!/bin/bash

echo "Configuring dragonstackdb"

sudo -u postgres dropdb dragonstackdb
sudo -u postgres createdb --owner=node_user dragonstackdb

declare -a refArr
for folder in ./bin/sql/*
do
    refArr=("${refArr[@]}" "$folder")
done

count=1
while [ $count -le "${#refArr[@]}" ]
do
    for file in ./bin/sql/reference_set_$count/*.sql
    do
        sudo PGPASSWORD=$DRAGON_PW -u postgres psql -h localhost -U node_user -d dragonstackdb < $file
    done
    let count++
done

node ./bin/insertTraits.js

echo "dragonstackdb configured"