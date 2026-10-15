using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Portfolio.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Image = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    Technologies = table.Column<string[]>(type: "text[]", nullable: false),
                    GithubUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DemoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    ImagePosition = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true),
                    Screenshots = table.Column<string[]>(type: "text[]", nullable: false),
                    DemoVideoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projects", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "projects",
                columns: new[] { "Id", "DemoUrl", "DemoVideoUrl", "Description", "GithubUrl", "Image", "ImagePosition", "Screenshots", "Status", "Technologies", "Title" },
                values: new object[,]
                {
                    { new Guid("71646c72-03a2-47d5-a1fd-e956e02c86a1"), "https://reelvio.netlify.app", null, "Reelvio é uma aplicação Next.js para descobrir filmes, séries, trailers e notícias do universo audiovisual. O projeto consome APIs externas, organiza regras em camadas, salva preferências no navegador e possui testes automatizados para proteger os fluxos principais.", "https://github.com/LuaraGoncalves/Reelvio", "/projects/home-dashboard-reelvio.png", null, new string[0], "Concluído", new[] { "JavaScript", "React 19", "Next.js 16" }, "Reelvio" },
                    { new Guid("de587688-7ab8-4e6a-98b1-d3ea9deae239"), "https://florae-garden.netlify.app", null, "Plataforma web de cuidados com plantas, com catálogo pesquisável, orientações de cultivo e painel administrativo. Desenvolvida com React, Node.js e PostgreSQL.", "https://github.com/LuaraGoncalves/Florae", "/projects/florae-garden.png", "30% center", new string[0], "Concluído", new[] { "React", "TypeScript", "PostgreSQL" }, "Florae" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_projects_Title",
                table: "projects",
                column: "Title",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "projects");
        }
    }
}
