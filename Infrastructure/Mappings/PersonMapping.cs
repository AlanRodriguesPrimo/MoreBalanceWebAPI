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
    public class PersonMapping : IEntityTypeConfiguration<PersonEntity>
    {
        public void Configure (EntityTypeBuilder<PersonEntity> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(p => p.Age)
                .IsRequired();

            builder.HasMany(x=>x.Transactions).WithOne(x=>x.Person).HasForeignKey(x=>x.PersonId);

        }
    }
}
