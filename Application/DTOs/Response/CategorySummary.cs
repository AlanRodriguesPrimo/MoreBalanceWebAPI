using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class CategorySummary
    {
        public string Description { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalRevenues { get; set; }
        public decimal Balance { get; set; }
        public CategorySummary() { }
        public CategorySummary(string description, decimal totalAmountPeople, decimal totalAmountExpenses, decimal totalAmountRevenues, decimal totalAmountBalance)
        {
            Description = description;
            TotalExpenses = totalAmountExpenses;
            TotalRevenues = totalAmountRevenues;
            Balance = totalAmountBalance;
        }
    }
}

