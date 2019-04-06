CREATE TABLE dragonAccount
(
    "accountId" INTEGER,
    "dragonId" INTEGER,
    FOREIGN KEY ("accountId") REFERENCES account(id),
    FOREIGN KEY ("dragonId") REFERENCES dragon(id),
    PRIMARY KEY ("accountId", "dragonId")
);