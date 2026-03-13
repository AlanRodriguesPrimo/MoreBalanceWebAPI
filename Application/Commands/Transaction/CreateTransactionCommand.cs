using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.TransactionEnums;

namespace Application.Commands.Transaction
{
    public class CreateTransactionCommand
    {
        public CreateTransactionCommand() { }

        public string Description { get; set; }
        public decimal Value { get; set; }
        public TransactionPurpose Type { get; set; }
        public Guid Category { get; set; }
        public Guid Person { get; set; }
    }
}
