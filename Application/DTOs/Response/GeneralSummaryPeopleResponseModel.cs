using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class GeneralSummaryPeopleResponseModel
    {
       public List<PeopleSummary> PeopleSummaries { get; set; } = new List<PeopleSummary>();
        public decimal TotalAmountPeople { get; set; }
        public decimal TotalAmountExpenses { get; set; }
        public decimal TotalAmountRevenues { get; set; }
        public decimal TotalAmountBalance { get; set; }
    }
}
