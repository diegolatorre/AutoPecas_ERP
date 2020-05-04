﻿CREATE TABLE [dbo].[CONTATO]
(
	[IDCONTATO] INT IDENTITY (1, 1) NOT NULL PRIMARY KEY,
	[NOME] NVARCHAR(200) NOT NULL,
	[APELIDO] NVARCHAR(200) NOT NULL,
	[CPF] NVARCHAR(200) NOT NULL,
	[RG] NVARCHAR(200),
	[TIPO] CHAR NOT NULL,
	[PROFISSAO] NVARCHAR(200) NOT NULL,
	[DATANASCIMENTO] DATE,
	[SEXO] NVARCHAR(200),
	[OBSERVACAO] NVARCHAR(MAX),
	[ATIVO] BIT NOT NULL
)

GO

CREATE INDEX [IX_CONTATO_IDCONTATO] ON [dbo].[CONTATO] ([IDCONTATO])