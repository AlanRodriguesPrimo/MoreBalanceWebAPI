using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.CategoryEnum;

namespace Domain.Entities
{
    public class CategoryEntity : BaseEntity
    {
        public string Description { get; set; } 
        public CategoryPurpose Purpose { get; set; }


        public CategoryEntity(string description,CategoryPurpose purpose) 
        {
            Description = description;
                Purpose = purpose;
        }
        public virtual ICollection<TransactionEntity> Transactions { get; set; }
    }
}
