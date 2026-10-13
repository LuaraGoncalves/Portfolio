using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    service = "portfolio-api"
}));

app.MapGet("/api/v1/projects", async (
    IWebHostEnvironment environment,
    CancellationToken cancellationToken) =>
{
    var filePath = Path.Combine(environment.ContentRootPath, "data", "projects.json");

    await using var file = File.OpenRead(filePath);
    var projects = await JsonSerializer.DeserializeAsync<List<PortfolioProject>>(
        file,
        new JsonSerializerOptions(JsonSerializerDefaults.Web),
        cancellationToken);

    return Results.Ok(projects ?? []);
});

app.Run();

public sealed record PortfolioProject(
    string Title,
    string Image,
    string Description,
    string[] Techs,
    string GithubUrl,
    string? DemoUrl,
    string Status);
