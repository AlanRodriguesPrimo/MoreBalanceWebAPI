using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PersonEntity : BaseEntity
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public virtual ICollection<TransactionEntity> Transactions { get; set; }


        public PersonEntity(string name, int age)
        {
            Name = name;
            Age = age;

        }
    }
}
