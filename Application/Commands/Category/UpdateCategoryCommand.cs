using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Category
{
    public class UpdateCategoryCommand
    {
        public UpdateCategoryCommand() { }

        public Guid Id { get; set; }
        public string Description { get; set; }
        public CategoryEnum.CategoryPurpose Purpose { get; set; }


        public UpdateCategoryCommand(Guid id, string description, CategoryEnum.CategoryPurpose purpose)
        {
            Id = id;
            Description = description;
            Purpose = purpose;
        }
    }
}
