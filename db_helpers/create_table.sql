CREATE TABLE routes_data (
    routeType varchar(10) NOT NULL,
    scenicRating int,
    elevationRating varchar(10),
    paved varchar(10),
    overallRating varchar(10),
    notes text,
    routeJson text NOT NULL,
    routeLength real,
    submit_datetime timestamptz
)