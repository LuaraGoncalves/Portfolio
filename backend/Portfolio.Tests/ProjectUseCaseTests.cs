using Portfolio.Application.Projects;
using Portfolio.Domain.Projects;
using Xunit;

namespace Portfolio.Tests;

public sealed class ProjectUseCaseTests
{
    [Fact]
    public async Task ListProjects_ReturnsGalleryAndDemoDetails()
    {
        var project = new Project(
            Guid.NewGuid(), "Florae", "/florae.png", "Plant care", ["React", "PostgreSQL"],
            "https://github.com/LuaraGoncalves/Florae", "https://florae.example", "Concluído",
            screenshots: ["/florae-home.png", "/florae-detail.png"],
            demoVideoUrl: "https://youtu.be/example");
        var useCase = new ListProjects(new InMemoryProjectRepository(project));

        var projects = await useCase.ExecuteAsync(CancellationToken.None);

        var result = Assert.Single(projects);
        Assert.Equal("Florae", result.Title);
        Assert.Equal(new[] { "/florae-home.png", "/florae-detail.png" }, result.Screenshots);
        Assert.Equal("https://youtu.be/example", result.DemoVideoUrl);
    }

    [Fact]
    public void Project_RequiresARepositoryLink()
    {
        Assert.Throws<ArgumentException>(() => new Project(
            Guid.NewGuid(), "Florae", "/florae.png", "Plant care", ["React"], "", null, "Concluído"));
    }

    private sealed class InMemoryProjectRepository(Project project) : IProjectRepository
    {
        public Task<IReadOnlyList<Project>> ListAsync(CancellationToken cancellationToken) =>
            Task.FromResult<IReadOnlyList<Project>>([project]);
    }
}
