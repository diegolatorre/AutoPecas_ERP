﻿CREATE TABLE [dbo].[NOTAS]
(
	[IDNOTA] INT NOT NULL IDENTITY (1, 1) PRIMARY KEY, 
    [IDCONTATOORIGEM] INT NULL,
    [IDCONTATODESTINO] INT NULL,
    [CHAVEACESSO] NVARCHAR(150) NOT NULL, 
    [TIPO] INT NOT NULL, 
    [OBSERVACAO] NVARCHAR(MAX) NULL, 
)