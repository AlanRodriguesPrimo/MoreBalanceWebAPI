using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.TransactionEnums;

namespace Domain.Entities
{
    public class TransactionEntity :BaseEntity
    {

        public string Description { get; set; }
        public decimal Value { get; set; }
        public TransactionPurpose Type {  get; set; }
        public Guid CategoryId { get; set; }
        public Guid PersonId { get; set; }
        public virtual PersonEntity Person { get; set; }
        public virtual CategoryEntity Category { get; set; }
    }
}
