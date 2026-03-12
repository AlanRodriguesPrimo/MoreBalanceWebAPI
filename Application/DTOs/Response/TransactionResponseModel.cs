using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.TransactionEnums;

namespace Application.DTOs.Response
{
    public class TransactionResponseModel 
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public TransactionPurpose Type { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Guid PersonId { get; set; }
        public string PersonName { get; set; }
    }
}
