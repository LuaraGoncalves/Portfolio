using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Projects;
using Portfolio.Domain.Projects;

namespace Portfolio.Infrastructure.Persistence;

public sealed class ProjectRepository(PortfolioDbContext dbContext) : IProjectRepository
{
    public async Task<IReadOnlyList<Project>> ListAsync(CancellationToken cancellationToken) =>
        await dbContext.Projects.AsNoTracking().OrderBy(project => project.Title).ToListAsync(cancellationToken);
}
