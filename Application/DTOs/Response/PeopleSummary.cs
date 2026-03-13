using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class PeopleSummary
    {

        public string Name { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalRevenues { get; set; }
        public decimal Balance { get; set; }
        public PeopleSummary() { }
        public PeopleSummary(string name, decimal totalAmountPeople, decimal totalAmountExpenses, decimal totalAmountRevenues, decimal totalAmountBalance)
        {
            Name = name;
            TotalExpenses = totalAmountExpenses;
            TotalRevenues = totalAmountRevenues;
            Balance = totalAmountBalance;
        }
    }
}