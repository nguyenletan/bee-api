alter table "LightingSystem"
    add "numberOfBulbs" integer;

alter table "LightingSystem"
    add "wattRatingOfBulb" integer;

alter table "LightingSystem"
    add "lumensOfBulb" double precision;

INSERT INTO public."LightingFittingType" (id, name, description)
VALUES (DEFAULT, 'Others', null);

INSERT INTO public."R_LightFittingEfficacy" (id, light_fitting, efficacy)
VALUES (DEFAULT, 'Others', 0);
