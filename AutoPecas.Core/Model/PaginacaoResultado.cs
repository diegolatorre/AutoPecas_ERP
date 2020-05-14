using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AutoPecas.Core.Model
{
    public class PaginacaoResultado<T>
    {
        public static PaginacaoResultado<T> PaginaVazia(int pagina, int tamanhoPagina) => new PaginacaoResultado<T>(pagina, tamanhoPagina, 0);

        public PaginacaoResultado(int pagina, int tamanhoPagina, int total)
        {
            Pagina = pagina;
            TamanhoPagina = tamanhoPagina;
            Total = total;
            Lista = new List<T>();
        }

        public PaginacaoResultado(IQueryable<T> query, int pagina, int tamanhoPagina, int? total = null)
        {
            if (total.HasValue)
            {
                Total = total.Value;
            }
            else
            {
                Total = query.CountAsync().Result;
            }

            Pagina = pagina;
            TamanhoPagina = tamanhoPagina;
        }

        public int Total { get; private set; }

        public int Pagina { get; private set; }

        public int TamanhoPagina { get; private set; }

        public List<T> Lista { get; set; }

        public int TotalPaginas => (int)Math.Ceiling(Total / (double)TamanhoPagina);

        public bool TemAnterior => Pagina > 1;

        public bool TemProxima => Pagina < TotalPaginas;

        public int Proxima => TemProxima ? Pagina + 1 : TotalPaginas;

        public int Anterior => TemAnterior ? Pagina - 1 : 1;
    }
}

