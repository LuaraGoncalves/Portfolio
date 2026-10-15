namespace Portfolio.Application.Projects;

public sealed class ListProjects(IProjectRepository repository)
{
    public async Task<IReadOnlyList<ProjectDto>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var projects = await repository.ListAsync(cancellationToken);
        return projects.Select(project => new ProjectDto(
            project.Id,
            project.Title,
            project.Image,
            project.Description,
            project.Technologies,
            project.GithubUrl,
            project.DemoUrl,
            project.Status,
            project.ImagePosition,
            project.Screenshots,
            project.DemoVideoUrl)).ToArray();
    }
}
