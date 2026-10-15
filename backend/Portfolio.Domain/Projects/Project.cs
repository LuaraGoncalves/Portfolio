namespace Portfolio.Domain.Projects;

public sealed class Project
{
    private Project() { }

    public Project(
        Guid id,
        string title,
        string image,
        string description,
        IEnumerable<string> technologies,
        string githubUrl,
        string? demoUrl,
        string status,
        string? imagePosition = null,
        IEnumerable<string>? screenshots = null,
        string? demoVideoUrl = null)
    {
        if (id == Guid.Empty) throw new ArgumentException("Project id is required.", nameof(id));
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Project title is required.", nameof(title));
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentException("Project description is required.", nameof(description));
        if (string.IsNullOrWhiteSpace(githubUrl)) throw new ArgumentException("A repository URL is required.", nameof(githubUrl));

        Id = id;
        Title = title.Trim();
        Image = image?.Trim() ?? string.Empty;
        Description = description.Trim();
        Technologies = technologies.Where(value => !string.IsNullOrWhiteSpace(value)).Select(value => value.Trim()).ToArray();
        GithubUrl = githubUrl.Trim();
        DemoUrl = string.IsNullOrWhiteSpace(demoUrl) ? null : demoUrl.Trim();
        Status = string.IsNullOrWhiteSpace(status) ? "Concluído" : status.Trim();
        ImagePosition = string.IsNullOrWhiteSpace(imagePosition) ? null : imagePosition.Trim();
        Screenshots = (screenshots ?? []).Where(value => !string.IsNullOrWhiteSpace(value)).Select(value => value.Trim()).ToArray();
        DemoVideoUrl = string.IsNullOrWhiteSpace(demoVideoUrl) ? null : demoVideoUrl.Trim();
    }

    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Image { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string[] Technologies { get; private set; } = [];
    public string GithubUrl { get; private set; } = string.Empty;
    public string? DemoUrl { get; private set; }
    public string Status { get; private set; } = string.Empty;
    public string? ImagePosition { get; private set; }
    public string[] Screenshots { get; private set; } = [];
    public string? DemoVideoUrl { get; private set; }
}
