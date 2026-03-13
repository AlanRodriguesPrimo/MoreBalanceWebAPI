using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Person
{
    public class CreatePersonCommand 
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
}
