docker exec -i postgres_container /bin/bash -c "PGPASSWORD=BEE@2021 pg_dump --username postgres bee-dev-db" > /home/dump.sql

docker exec -i pg_container /bin/bash -c "PGPASSWORD=root psql --username root bee-dev-db" < /home/dump.sql

scp root@46.101.7.138:/home/dump.sql /home

psql \
-h db.lckvjvsmqajiposrvvum.supabase.co \
-U postgres \
< dump.sql

psql \
-h 46.101.7.138 -p 5433 \
-U beedev \
< dump.sql


psql -h db-postgresql-sgp1-03455-do-user-7222370-0.b.db.ondigitalocean.com -p 25060 -d beedev_db -U beedev < dump.sql

PGPASSWORD=onK1HTVECNjxocxi pg_restore -U doadmin -h db-postgresql-sgp1-03455-do-user-7222370-0.b.db.ondigitalocean.com -p 25060 -d defaultdb

psql -U postgres bee_dev_2 < dump.sql

psql -h 46.101.7.138 -p 5433 -d beedev_db -U beedev < dump.sql

PGPASSWORD=lO1tGQStVW6xQeBh psql -U beedev -h db-postgresql-sgp1-03455-do-user-7222370-0.b.db.ondigitalocean.com -p 25060 -d beedev_db < dump.sql --set=sslmode=require


## The most simple case is dumping and restoring on the same server:

$ pg_dump -h localhost -Fc test > /home/postgres/dump.sql

$ pg_restore -h localhost test < /home/postgres/dump.sql


Or with a plain text dump:

$ pg_dump -h localhost -f /home/postgres/dump.sql test

$ psql -h localhost -f /home/postgres/dump.sql test


## Where this gets interesting is with multiple hosts. You can:

$ # dump a remote database to your local machine

$ pg_dump -h remotedb.mydomain.com -f /home/postgres/dump.sql test


$ # dump a local database and write to a remote machine

$ pg_dump -h remotedb.mydomain.com test | ssh postgres@remotedb.mydomain.com 'cat > dump.sql'


$ # dump a remote database and write to the same remote machine

$ pg_dump -h remotedb.mydomain.com test | ssh postgres@remotedb.mydomain.com 'cat > dump.sql'


$ # or a different remote machine

$ pg_dump -h remotedb1.mydomain.com test | ssh postgres@remotedb2.mydomain.com 'cat > dump.sql'


You also have similar restore options. I will use psql below but pg_restore works the same:

$ # dump a remote database and restore to your local machine

$ pg_dump -h remotedb.mydomain.com test1 | psql test2


$ # dump a local database and restore to a remote machine

$ pg_dump -h remotedb.mydomain.com test | ssh postgres@remotedb.mydomain.com 'psql test'


$ # dump a remote database and restore to the same remote machine

$ pg_dump -h remotedb.mydomain.com test1 | ssh postgres@remotedb.mydomain.com 'psql test2'


$ # or a different remote machine

$ pg_dump -h remotedb1.mydomain.com test | ssh postgres@remotedb2.mydomain.com 'psql test'