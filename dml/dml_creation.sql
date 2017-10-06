-- CREATE TEAM
CREATE TABLE TEAM (
	TEAM_ID INT NOT NULL PRIMARY KEY,
	NAME VARCHAR(200) NOT NULL,
	SHORTNAME VARCHAR(20) NOT NULL,
	DESCRIPTION VARCHAR(200),
	CRESTURL VARCHAR(255) NOT NULL
);

-- CREATE PLAYERS ATTRIBUTES
CREATE TABLE ATTRIBUTES (
  ATTRIBUTES_ID INT NOT NULL PRIMARY KEY,
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
  REMATE_LONGA_DISTANCIA INT NOT NULL
);

-- CREATE PLAYERS
CREATE TABLE PLAYER (
	PLAYER_ID INT NOT NULL PRIMARY KEY,
	TEAM_ID INT NOT NULL,
	NAME VARCHAR(200) NOT NULL,
	POSITION VARCHAR(100) NOT NULL,
	JERSEY_NUMBER VARCHAR(20) NOT NULL,
	NATIONALITY VARCHAR(50) NOT NULL,
	PICTURE BLOB,
	CONTRACT_UNTIL DATE,
	MARKET_VALUE VARCHAR(200),
	ATTRIBUTES_ID INT,
	FOREIGN KEY (ATTRIBUTES_ID)
     	REFERENCES ATTRIBUTES(ATTRIBUTES_ID),
	 FOREIGN KEY (TEAM_ID)
	 	REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE CALENDAR (
	EVENT_ID INT NOT NULL PRIMARY KEY,
	TITLE VARCHAR(100) NOT NULL,
	TYPE VARCHAR(20) NOT NULL,
	START_DATE DATE,
	END_DATE DATE,
	TEAM_ID INT,
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE TACTICS (
	TACTIC_ID INT NOT NULL PRIMARY KEY,
	DESCRIPTION VARCHAR(100),
	PLAYER_ID INT NOT NULL,
	PLAYER_X_POSITION VARCHAR(100) NOT NULL,
	PLAYER_Y_POSITION VARCHAR(100) NOT NULL,
	PLAYER_Z_POSITION VARCHAR(100) NOT NULL,
	TEAM_ID INT NOT NULL,
	EVENT_ID INT NOT NULL,
	FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYER_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
	FOREIGN KEY (EVENT_ID) REFERENCES CALENDAR(EVENT_ID)
);

CREATE TABLE PRACTICES (
	PRACTICE_ID INT NOT NULL PRIMARY KEY,
	TITLE VARCHAR(20) NOT NULL,
	PRACTICE_DESC VARCHAR(100) NOT NULL,
	START_DATE DATE,
	TYPE VARCHAR(20),
	VOLUME VARCHAR(20),
	INTENSITY VARCHAR(20),
	DENSITY VARCHAR(20),
	FREQUENCY VARCHAR(20),
	DESCRIPTION VARCHAR(100),
	PLAYER_ID INT NOT NULL,
	PLAYER_X_POSITION VARCHAR(100) NOT NULL,
	PLAYER_Y_POSITION VARCHAR(100) NOT NULL,
	PLAYER_Z_POSITION VARCHAR(100) NOT NULL,
	TEAM_ID INT NOT NULL,
	EVENT_ID INT NOT NULL,
	FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYER_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
	FOREIGN KEY (EVENT_ID) REFERENCES CALENDAR(EVENT_ID)
);

-- alguns inserts
insert into TEAM(TEAM_ID, NAME, SHORTNAME, DESCRIPTION, CRESTURL) values (57, 'Arsenal FC', 'Arsenal', '', 'http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg');

insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1001, 57, 'José Amador', 'Treinador', 00, 'Portuguese');
insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1002, 57, 'Jorge Mestre', 'Director Desportivo', 00, 'Portuguese');
insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1003, 57, 'André Vieira', 'Treinador Adjunto', 00, 'Portuguese');
insert into PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1004, 57, 'Leonel Gomes', 'Massagista', 00, 'Portuguese'); 
