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
    public class TransactionMapping : IEntityTypeConfiguration<TransactionEntity>
    {
        public void Configure (EntityTypeBuilder<TransactionEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Description).IsRequired().HasMaxLength(400);
            builder.Property(x => x.Value).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(x => x.Type).IsRequired();


            builder.HasOne(x => x.Category).WithMany(x=>x.Transactions).HasForeignKey(x => x.CategoryId);
            builder.HasOne(x => x.Person).WithMany(x=>x.Transactions).HasForeignKey(x => x.PersonId);
        }
    }
}
