rm -R /var/www/html/mypocketcoach
cp -r appzedabertaremixed/ /var/www/html/
mv appzedabertaremixed mypocketcoach


DROP TABLE TACTICS;
DROP TABLE PRACTICES;
DROP TABLE PLAYER;
DROP TABLE ATTRIBUTES;
DROP TABLE CALENDAR;
DROP TABLE TEAM;
DROP TABLE GAME_STATS;
DROP TABLE USERS;
DROP TABLE PROFILES;


-- CREATE TEAM
CREATE TABLE TEAM (
	TEAM_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(200) NOT NULL,
	SHORTNAME VARCHAR(20) NOT NULL,
	DESCRIPTION VARCHAR(200),
	CRESTURL VARCHAR(255) NOT NULL,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL
);

-- CREATE PROFILE
CREATE TABLE PROFILES (
		PROFILE_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		PROFILE_TYPE VARCHAR(10) NOT NULL,
		PROFILE_DESCRIPTION VARCHAR(200) NOT NULL
);

-- CREATE USER DATABASE
CREATE TABLE USERS (
	USER_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	USERNAME VARCHAR(20) NOT NULL,
	PASSWORD VARCHAR(255) NOT NULL,
	TEAM_ID INT NOT NULL,
	NAME VARCHAR(50) NOT NULL,
	LEAGUE_TABLE INT NOT NULL,
	AGE VARCHAR(20) NOT NULL,
	PLACE_OF_BIRTH VARCHAR(200) NOT NULL,
	NATIONALITY VARCHAR(200) NOT NULL,
	PICTURE MEDIUMBLOB,
	PROFILE_ID INT NOT NULL,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL,
	FOREIGN KEY (PROFILE_ID)
     	REFERENCES PROFILES(PROFILE_ID),
	FOREIGN KEY (TEAM_ID)
     	REFERENCES TEAM(TEAM_ID)
);

-- CREATE PLAYERS ATTRIBUTES
CREATE TABLE ATTRIBUTES (
  ATTRIBUTES_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ALTURA INT NOT NULL,
  RESISTENCIA INT NOT NULL,
  AGILIDADE INT NOT NULL,
  SALTO_ALTURA INT NOT NULL,
  SALTO_COMPRIMENTO  INT NOT NULL,
  ACELERACAO INT NOT NULL,
  VELOCIDADE_10 INT NOT NULL,
  VELOCIDADE_20 INT NOT NULL,
  VELOCIDADE_50m INT NOT NULL,
  VELOCIDADE_100m  INT NOT NULL,
  LIDERANCA INT NOT NULL,
  EQUIPA INT NOT NULL,
  RACIO_TRABALHO INT NOT NULL,
  DETERMINACAO 	 INT NOT NULL,
  CRIATIVIDADE INT NOT NULL,
  CONCENTRACAO INT NOT NULL,
  AGRESSIVIDADE 	 INT NOT NULL,
  CRUZAMENTO INT NOT NULL,
  DRIBLE INT NOT NULL,
  FINTA INT NOT NULL,
  REMATE INT NOT NULL,
  FINALIZACAO INT NOT NULL,
  CABECEAMENTO INT NOT NULL,
  PRIMEIRO_TOQUE INT NOT NULL,
  RECEPCAO_ORIENTADA  INT NOT NULL,
  LIVRES INT NOT NULL,
  LANCAMENTOS INT NOT NULL,
  PENALTIES INT NOT NULL,
  CANTOS INT NOT NULL,
  TECNICA INT NOT NULL,
  PASSE_CURTO INT NOT NULL,
  PASSE_LONGO INT NOT NULL,
  REMATE_LONGA_DISTANCIA INT NOT NULL,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL
);

-- CREATE PLAYERS
CREATE TABLE PLAYER (
	PLAYER_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TEAM_ID INT NOT NULL,
	NAME VARCHAR(200) NOT NULL,
	POSITION VARCHAR(300) NOT NULL,
	JERSEY_NUMBER VARCHAR(20) NOT NULL,
	AGE VARCHAR(20) NOT NULL,
	NATIONALITY VARCHAR(50) NOT NULL,
	PICTURE MEDIUMBLOB,
	CONTRACT_UNTIL TIMESTAMP DEFAULT '2038-01-19 03:14:07',
	MARKET_VALUE VARCHAR(200),
	ATTRIBUTES_ID INT,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL,
	FOREIGN KEY (ATTRIBUTES_ID)
     	REFERENCES ATTRIBUTES(ATTRIBUTES_ID),
	 FOREIGN KEY (TEAM_ID)
	 	REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE CALENDAR (
	EVENT_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TITLE VARCHAR(100) NOT NULL,
	TYPE VARCHAR(20) NOT NULL,
	START_DATE TIMESTAMP,
	END_DATE TIMESTAMP NULL,
	TEAM_ID INT,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL,
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE TACTICS (
	TACTIC_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	DESCRIPTION VARCHAR(100),
	PLAYER_ID INT NOT NULL,
	PLAYER_X_POSITION VARCHAR(100) NOT NULL,
	PLAYER_Y_POSITION VARCHAR(100) NOT NULL,
	PLAYER_Z_POSITION VARCHAR(100) NOT NULL,
	TEAM_ID INT NOT NULL,
	EVENT_ID INT NOT NULL,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL,
	FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYER_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
	FOREIGN KEY (EVENT_ID) REFERENCES CALENDAR(EVENT_ID)
);

CREATE TABLE PRACTICES (
	PRACTICE_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TITLE VARCHAR(20) NOT NULL,
	PRACTICE_DESC VARCHAR(100) NOT NULL,
	FIELD_LOCATION VARCHAR(100) NOT NULL,
	FIELD_WEIGHT VARCHAR(100) NOT NULL,
	FIELD_HEIGHT VARCHAR(100) NOT NULL,
	START_DATE TIMESTAMP,
	TYPE VARCHAR(100),
	VOLUME VARCHAR(20),
	INTENSITY VARCHAR(20),
	DENSITY VARCHAR(20),
	FREQUENCY VARCHAR(20),
	DESCRIPTION VARCHAR(100),
	PLAYER_ID INT NULL,
	OBJECT_ICON_ID VARCHAR(50) DEFAULT '',
	PLAYER_X_POSITION VARCHAR(100) NULL,
	PLAYER_Y_POSITION VARCHAR(100) NULL,
	PLAYER_Z_POSITION VARCHAR(100) NULL,
	OBJECT_X_POSITION VARCHAR(100) DEFAULT '',
	OBJECT_Y_POSITION VARCHAR(100) DEFAULT '',
	OBJECT_Z_POSITION VARCHAR(100) DEFAULT '',
	TEAM_ID INT NOT NULL,
	EVENT_ID INT NOT NULL,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL,
	FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYER_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
	FOREIGN KEY (EVENT_ID) REFERENCES CALENDAR(EVENT_ID)
);

CREATE TABLE GAME_STATS (
	SUCCESS_PASS INT NOT NULL,
	FAILED_PASS INT NOT NULL,
	CROSSING_PASS INT NOT NULL,
	FAILED_CROSSING_PASS INT NOT NULL,
	BALL_WON INT NOT NULL,
	BALL_FAILED INT NOT NULL,
	HEADING INT NOT NULL,
	FOUL INT NOT NULL,
	DISARM INT NOT NULL,
	YELLOW_CARD INT NOT NULL,
	DRIBLE INT NOT NULL,
	RED_CARD INT NOT NULL,
	SHOOT_SIDE INT NOT NULL,
	SELF_GOAL INT NOT NULL,
	SHOOT_GOAL INT NOT NULL,
	OFFSIDE INT NOT NULL,
	INTERCEPTED_SHOOT INT NOT NULL,
	WON_HEADING INT NOT NULL,
	GOAL INT NOT NULL,
	ASSIST INT NOT NULL,
	SUCCESS_PASS_OTHER_TEAM INT NOT NULL,
	FAILED_PASS_OTHER_TEAM INT NOT NULL,
	CROSSING_PASS_OTHER_TEAM INT NOT NULL,
	FAILED_CROSSING_PASS_OTHER_TEAM INT NOT NULL,
	BALL_WON_OTHER_TEAM INT NOT NULL,
	BALL_FAILED_OTHER_TEAM INT NOT NULL,
	HEADING_OTHER_TEAM INT NOT NULL,
	FOUL_OTHER_TEAM INT NOT NULL,
	DISARM_OTHER_TEAM INT NOT NULL,
	YELLOW_CARD_OTHER_TEAM INT NOT NULL,
	DRIBLE_OTHER_TEAM INT NOT NULL,
	RED_CARD_OTHER_TEAM INT NOT NULL,
	SHOOT_SIDE_OTHER_TEAM INT NOT NULL,
	SELF_GOAL_OTHER_TEAM INT NOT NULL,
	SHOOT_GOAL_OTHER_TEAM INT NOT NULL,
	OFFSIDE_OTHER_TEAM INT NOT NULL,
	INTERCEPTED_SHOOT_OTHER_TEAM INT NOT NULL,
	WON_HEADING_OTHER_TEAM INT NOT NULL,
	GOAL_OTHER_TEAM INT NOT NULL,
	ASSIST_OTHER_TEAM INT NOT NULL,
	TEAM_ID INT NOT NULL,
	EVENT_ID INT NOT NULL,
	CREATION_DATE TIMESTAMP NULL,
	UPDATE_DATE TIMESTAMP NULL,
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
	FOREIGN KEY (EVENT_ID) REFERENCES CALENDAR(EVENT_ID)
);

-- alguns inserts
insert into TEAM(TEAM_ID, NAME, SHORTNAME, DESCRIPTION, CRESTURL) values (57, 'Arsenal FC', 'Arsenal', '', 'http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg');


insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Calum Chambers',22,'Right-Back',21,'England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Jack Wilshere','25','Central Midfield','10','England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Petr Cech','35','Keeper','33','Czech Republic',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'David Ospina','29','Keeper','13','Colombia',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Matt Macey','23','Keeper','54','England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Shkodran Mustafi','25','Centre-Back','20','Germany',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Laurent Koscielny','32','Centre-Back','6','France',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Per Mertesacker','33','Centre-Back','4','Germany',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Rob Holding','22','Centre-Back','16','England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Nacho Monreal','31','Left-Back','18','Spain',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Héctor Bellerín','22','Right-Back','24','Spain',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Mathieu Debuchy','32','Right-Back','2','France',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Granit Xhaka','25','Defensive Midfield','29','Switzerland',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Francis Coquelin','26','Defensive Midfield','34','France',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Mohamed Elneny','25','Defensive Midfield','35','Egypt',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Aaron Ramsey','26','Central Midfield','8','Wales',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Santi Cazorla','32','Central Midfield','19','Spain',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Mesut Özil','29','Attacking Midfield','11','Germany',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Alexis Sánchez','28','Left Wing','7','Chile',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Alex Iwobi','21','Left Wing','17','Nigeria',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Theo Walcott','28','Right Wing','14','England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Olivier Giroud','31','Centre-Forward','12','France',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Danny Welbeck','26','Centre-Forward','23','England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Alexandre Lacazette','26','Centre-Forward','9','France',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Chuba Akpom','22','Centre-Forward','32','England',NOW(),NOW());
insert into PLAYER(TEAM_ID, NAME, AGE, POSITION, JERSEY_NUMBER, NATIONALITY, CREATION_DATE, UPDATE_DATE) values (57,'Sead Kolasinac','24','Left-Back','31','Bosnia-Herzegovina',NOW(),NOW());

insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1001, 57, 'José Amador', 'Treinador', 100, 'Portuguese');
insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1002, 57, 'Jorge Mestre', 'Director Desportivo', 101, 'Portuguese');
insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1003, 57, 'André Vieira', 'Treinador Adjunto', 102, 'Portuguese');
insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1004, 57, 'Leonel Gomes', 'Massagista', 103, 'Portuguese');


INSERT INTO GAME_STATS (SUCCESS_PASS, FAILED_PASS, CROSSING_PASS, FAILED_CROSSING_PASS, BALL_WON, BALL_FAILED, HEADING, FOUL, DISARM, YELLOW_CARD, DRIBLE, RED_CARD, SHOOT_SIDE, SELF_GOAL, SHOOT_GOAL, OFFSIDE, INTERCEPTED_SHOOT, WON_HEADING, GOAL, ASSIST, SUCCESS_PASS_OTHER_TEAM, FAILED_PASS_OTHER_TEAM, CROSSING_PASS_OTHER_TEAM, FAILED_CROSSING_PASS_OTHER_TEAM, BALL_WON_OTHER_TEAM, BALL_FAILED_OTHER_TEAM, HEADING_OTHER_TEAM, FOUL_OTHER_TEAM, DISARM_OTHER_TEAM, YELLOW_CARD_OTHER_TEAM, DRIBLE_OTHER_TEAM, RED_CARD_OTHER_TEAM, SHOOT_SIDE_OTHER_TEAM, SELF_GOAL_OTHER_TEAM, SHOOT_GOAL_OTHER_TEAM, OFFSIDE_OTHER_TEAM, INTERCEPTED_SHOOT_OTHER_TEAM, WON_HEADING_OTHER_TEAM, GOAL_OTHER_TEAM, ASSIST_OTHER_TEAM, TEAM_ID, EVENT_ID)
values
(750, 449, 38, 90, 770, 432, 75, 22, 88, 3, 338, 1, 55, 88, 11, 10, 88, 99, 1, 45, 449, 750, 90, 38, 432, 770, 75, 22, 88, 4, 34, 0, 76, 10, 44, 22, 99, 44, 33, 88, 57, 55);

INSERT INTO PROFILES (PROFILE_TYPE, PROFILE_DESCRIPTION) VALUES ('coach', 'Coach Profile');
INSERT INTO PROFILES (PROFILE_TYPE, PROFILE_DESCRIPTION) VALUES ('player', 'Player Profile');
INSERT INTO PROFILES (PROFILE_TYPE, PROFILE_DESCRIPTION) VALUES ('manager', 'Manager Profile');

INSERT INTO USERS (USERNAME, PASSWORD, NAME, NATIONALITY,TEAM_ID, LEAGUE_TABLE, AGE, PLACE_OF_BIRTH, PROFILE_ID, CREATION_DATE, UPDATE_DATE)
VALUES ('zeamador', 'pw12345', 'José Amador', 'PT', 57, 445, 30, 'Baleizão', 1, current timestamp, current timestamp);
INSERT INTO USERS (USERNAME, PASSWORD, NAME, NATIONALITY,TEAM_ID, LEAGUE_TABLE, AGE, PLACE_OF_BIRTH, PROFILE_ID, CREATION_DATE, UPDATE_DATE)
VALUES ('antoniofranco', 'pw12345', 'António Franco', 'PT', 57, 445, 30, 'Lisboa', 1, current timestamp, current timestamp);
INSERT INTO USERS (USERNAME, PASSWORD, NAME, NATIONALITY,TEAM_ID, LEAGUE_TABLE, AGE, PLACE_OF_BIRTH, PROFILE_ID, CREATION_DATE, UPDATE_DATE)
VALUES ('pauloramos', 'pw12345', 'Paulo Ramos', 'PT', 57, 445, 30, 'Lisboa', 2, current timestamp, current timestamp);
INSERT INTO USERS (USERNAME, PASSWORD, NAME, NATIONALITY,TEAM_ID, LEAGUE_TABLE, AGE, PLACE_OF_BIRTH, PROFILE_ID, CREATION_DATE, UPDATE_DATE)
VALUES ('miguelsilva', 'pw12345', 'Miguel Silva', 'PT', 57, 445, 30, 'Lisboa', 3, current timestamp, current timestamp);
