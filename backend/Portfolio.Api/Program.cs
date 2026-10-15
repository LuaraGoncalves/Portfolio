using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Projects;
using Portfolio.Infrastructure;
using Portfolio.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddPortfolioInfrastructure(builder.Configuration);
var app = builder.Build();
app.UseExceptionHandler();

await using (var scope = app.Services.CreateAsyncScope())
{
    var database = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    await database.Database.MigrateAsync();
}

app.MapGet("/health", async (PortfolioDbContext database, CancellationToken cancellationToken) =>
    await database.Database.CanConnectAsync(cancellationToken)
        ? Results.Ok(new { status = "ok", service = "portfolio-api", database = "ok" })
        : Results.Problem(title: "Database unavailable", statusCode: StatusCodes.Status503ServiceUnavailable));

app.MapGet("/api/v1/projects", async (ListProjects listProjects, CancellationToken cancellationToken) =>
    Results.Ok(await listProjects.ExecuteAsync(cancellationToken)));

app.Run();

public partial class Program;
