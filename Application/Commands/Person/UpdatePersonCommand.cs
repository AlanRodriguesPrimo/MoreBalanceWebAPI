using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Person
{
    public class UpdatePersonCommand
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public int Age { get; set; }
    }
}
