docker exec -i postgres_container /bin/bash -c "PGPASSWORD=BEE@2021 pg_dump --username postgres bee-dev-db" > /home/dump.sql

docker exec -i pg_container /bin/bash -c "PGPASSWORD=root psql --username root bee-dev-db" < /home/dump.sql


psql \
-h db.cmivhwoqubycuikrwega.supabase.co \
-U postgres \
< dump.sql