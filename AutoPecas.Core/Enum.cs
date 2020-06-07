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
}