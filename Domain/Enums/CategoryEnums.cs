using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public class CategoryEnum
    {
        public enum CategoryPurpose
        {
            [Display(Name = "Despesa")] expense,
            [Display(Name = "Receita")] revenue,
            [Display(Name = "Ambos")] both,
        }
    }
  
}
