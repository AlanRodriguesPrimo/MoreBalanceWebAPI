using Application.Handlers;
using Domain.IRepositories.Contracts;
using Infrastructure.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Data;

namespace Infrastructure.Ioc
{
    public static class NativeInjectorBootstrapper
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {
        var sqlConnection = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(options =>
       options.UseSqlServer(
           sqlConnection,
           sqlOptions => sqlOptions.EnableRetryOnFailure(
               maxRetryCount: 5,
               maxRetryDelay: TimeSpan.FromSeconds(30),
               errorNumbersToAdd: null
           )
       )
   );

            services.AddScoped<IDbConnection>(provider =>
            {
                var connection = new SqlConnection(sqlConnection);
                connection.Open();
                return connection;
            });

            services.AddScoped<IPersonRepository, PersonRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();


            //handlers
            services.AddScoped<PersonHandler>();
            services.AddScoped<CategoryHandler>();
            services.AddScoped<TransactionHandler>();
            services.AddScoped<GeneralSummaryHandler>();
        }
    }
}
