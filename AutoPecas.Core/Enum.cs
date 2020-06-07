using System.ComponentModel.DataAnnotations;

namespace AutoPecas.Core
{
    public enum StatusVenda : int
    {
        [Display(Description = "Em Aberto")]
        Aberta = 0,

        [Display(Description = "Finalizada")]
        Finalizada = 1,
    }

    public enum TipoNota : int
    {
        [Display(Description = "Entrada")]
        Entrada = 0,

        [Display(Description = "Saída")]
        Saida = 1,
    }
}