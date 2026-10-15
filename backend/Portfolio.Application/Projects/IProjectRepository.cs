using Portfolio.Domain.Projects;

namespace Portfolio.Application.Projects;

public interface IProjectRepository
{
    Task<IReadOnlyList<Project>> ListAsync(CancellationToken cancellationToken);
}
