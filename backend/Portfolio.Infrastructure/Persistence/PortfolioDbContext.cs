using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Projects;

namespace Portfolio.Infrastructure.Persistence;

public sealed class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var project = modelBuilder.Entity<Project>();
        project.ToTable("projects");
        project.HasKey(item => item.Id);
        project.Property(item => item.Title).HasMaxLength(120).IsRequired();
        project.Property(item => item.Image).HasMaxLength(500).IsRequired();
        project.Property(item => item.Description).HasMaxLength(2000).IsRequired();
        project.Property(item => item.Technologies).HasColumnType("text[]").IsRequired();
        project.Property(item => item.GithubUrl).HasMaxLength(500).IsRequired();
        project.Property(item => item.DemoUrl).HasMaxLength(500);
        project.Property(item => item.Status).HasMaxLength(60).IsRequired();
        project.Property(item => item.ImagePosition).HasMaxLength(80);
        project.Property(item => item.Screenshots).HasColumnType("text[]").IsRequired();
        project.Property(item => item.DemoVideoUrl).HasMaxLength(500);
        project.HasIndex(item => item.Title).IsUnique();
        project.HasData(
            new Project(Guid.Parse("71646c72-03a2-47d5-a1fd-e956e02c86a1"), "Reelvio", "/projects/home-dashboard-reelvio.png", "Reelvio é uma aplicação Next.js para descobrir filmes, séries, trailers e notícias do universo audiovisual. O projeto consome APIs externas, organiza regras em camadas, salva preferências no navegador e possui testes automatizados para proteger os fluxos principais.", ["JavaScript", "React 19", "Next.js 16"], "https://github.com/LuaraGoncalves/Reelvio", "https://reelvio.netlify.app", "Concluído"),
            new Project(Guid.Parse("de587688-7ab8-4e6a-98b1-d3ea9deae239"), "Florae", "/projects/florae-garden.png", "Plataforma web de cuidados com plantas, com catálogo pesquisável, orientações de cultivo e painel administrativo. Desenvolvida com React, Node.js e PostgreSQL.", ["React", "TypeScript", "PostgreSQL"], "https://github.com/LuaraGoncalves/Florae", "https://florae-garden.netlify.app", "Concluído", "30% center"));
    }
}
