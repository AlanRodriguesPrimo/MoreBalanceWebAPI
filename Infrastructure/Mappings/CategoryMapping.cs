using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mappings
{
    public class CategoryMapping : IEntityTypeConfiguration<CategoryEntity>
    {
        public  void Configure(EntityTypeBuilder<CategoryEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Description).IsRequired().HasMaxLength(400);
            builder.Property(x => x.Purpose).IsRequired();

            builder.HasMany(x => x.Transactions).WithOne(x=>x.Category).HasForeignKey(x=>x.CategoryId);
        }
    }
}
