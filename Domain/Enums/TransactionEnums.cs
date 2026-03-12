using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public class TransactionEnums
    {
        public enum TransactionPurpose
        {
            [Display(Name="Despesa")] expense,
            [Display(Name="Receita")] revenue,
        }
    }
}
