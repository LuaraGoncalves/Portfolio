namespace Portfolio.Application.Projects;

public sealed record ProjectDto(
    Guid Id,
    string Title,
    string Image,
    string Description,
    string[] Techs,
    string GithubUrl,
    string? DemoUrl,
    string Status,
    string? ImagePosition,
    string[] Screenshots,
    string? DemoVideoUrl);
