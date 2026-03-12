using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class PersonResponseModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }

        public PersonResponseModel(Guid id, string name, int age)
        {
            Id = id;
            Name = name;
            Age = age;
        }
    }
}
