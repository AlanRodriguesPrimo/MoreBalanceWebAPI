using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class GeneralSummaryCategoryResponseModel
    {
        public List<CategorySummary> CategorySummaries { get; set; } = new List<CategorySummary>();
        public decimal TotalAmountCategory { get; set; }
        public decimal TotalAmountExpenses { get; set; }
        public decimal TotalAmountRevenues { get; set; }
        public decimal TotalAmountBalance { get; set; }
    }
}
