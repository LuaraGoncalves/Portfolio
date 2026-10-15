import assert from "node:assert/strict";
import test from "node:test";

import { matchesProjectFilter } from "../lib/project-filters.ts";
import { parseProjectsResponse } from "../lib/portfolio-project-response.ts";
import { getProjectViewState } from "../lib/project-view-state.ts";

const project = {
  id: "project-1",
  title: "Florae",
  image: "/projects/florae-garden.png",
  description: "Um catálogo de plantas.",
  techs: ["React", "TypeScript", "ASP.NET Core"],
  githubUrl: "https://github.com/LuaraGoncalves/Florae",
  demoUrl: "https://florae-garden.netlify.app",
  status: "Concluído",
  imagePosition: null,
  screenshots: [],
  demoVideoUrl: null
};

test("shows a project in the matching web and development filters", () => {
  assert.equal(matchesProjectFilter(project, "web"), true);
  assert.equal(matchesProjectFilter(project, "development"), true);
});

test("does not show a project in unrelated categories", () => {
  assert.equal(matchesProjectFilter(project, "wordpress"), false);
  assert.equal(matchesProjectFilter(project, "copywriting"), false);
});

test("the all filter keeps any project", () => {
  assert.equal(matchesProjectFilter({ ...project, techs: [] }, "all"), true);
});

test("accepts a complete project response from the API", () => {
  assert.deepEqual(parseProjectsResponse(true, [project]), [project]);
});

test("rejects failed or malformed API responses", () => {
  assert.equal(parseProjectsResponse(false, [project]), null);
  assert.equal(parseProjectsResponse(true, { projects: [project] }), null);
  assert.equal(parseProjectsResponse(true, [{ title: "No fields" }]), null);
});

test("reports loading, API error, empty list, and loaded projects separately", () => {
  assert.equal(getProjectViewState(null, true), "loading");
  assert.equal(getProjectViewState(null, false), "error");
  assert.equal(getProjectViewState([], false), "empty");
  assert.equal(getProjectViewState([project], false), "ready");
});
