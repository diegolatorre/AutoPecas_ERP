using System;
using System.Collections.Generic;
using System.Text;

namespace AutoPecas.Core.Spec
{
    public class FiltroSpec : PaginacaoSpec
    {
        public Dictionary<string, object> Filtros { get; set; }

        public FiltroSpec() : base()
        {
            Filtros = new Dictionary<string, object>();
        }
    }
}
