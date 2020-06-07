﻿CREATE TABLE [dbo].[PRODUTONOTA]
(
	[IDPRODUTONOTA] INT NOT NULL IDENTITY (1, 1) PRIMARY KEY, 
    [IDNOTA] INT NOT NULL, 
    [IDPRODUTO] INT NOT NULL, 
    [QUANTIDADE] INT NULL,
    CONSTRAINT [FK_PRODUTONOTA_NOTA] FOREIGN KEY ([IDNOTA]) REFERENCES [NOTAS]([IDNOTA]),
    CONSTRAINT [FK_PRODUTONOTA_PRODUTO] FOREIGN KEY ([IDPRODUTO]) REFERENCES [PRODUTO]([IDPRODUTO]),
)
