using System;
using System.Collections.Generic;
using System.Text;

namespace AutoPecas.Core.Spec
{
    public class PaginacaoSpec
    {
        public int Pagina { get; set; } = 1;

        public int Tamanho { get; set; } = 10;

        public int IndiceInicio => (Tamanho * (Pagina - 1));

        public int? Total { get; set; }

    }
}
