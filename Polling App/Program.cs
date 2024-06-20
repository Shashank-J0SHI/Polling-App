using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Polling_App.Models;
using Polling_App.WsHubs;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllersWithViews();
        builder.Services.AddSignalR();

        builder.Services.AddDbContext<PollingAppContext>(options =>
        {
            options.UseSqlServer("Server=NIMBLE\\SQLEXPRESS;Database=PollingDB;Trusted_Connection=True;TrustServerCertificate=True");
        });

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                builder =>
                {
                    builder.WithOrigins("http://localhost", "http://10.13.0.196")
                        .AllowAnyHeader()
                        .WithMethods("GET", "POST")
                        .AllowCredentials();
                });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {

        }

        app.UseStaticFiles();
        app.UseRouting();

        app.UseCors();

        app.MapHub<UserWsHub>("/userWs");

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html"); ;

        app.Run();
    }
}