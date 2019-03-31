#!/bin/bash

echo "Configuring dragonstackdb"

sudo -u postgres dropdb dragonstackdb
sudo -u postgres createdb --owner=node_user dragonstackdb

sudo -u postgres psql node_user -h localhost -d dragonstackdb < ./bin/sql/generation.sql
sudo -u postgres psql node_user -h localhost -d dragonstackdb < ./bin/sql/dragon.sql

echo "dragonstackdb configured"