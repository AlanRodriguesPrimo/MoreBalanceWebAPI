using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.CategoryEnum;

namespace Application.DTOs.Response
{
    public class CategoryResponseModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public CategoryPurpose Purpose { get; set; }
    }
}
