# CLAUDE.md — AI Assistant Guide for Partenaire.io

## Project Overview

**Partenaire.io** is a web application project. This repository is in its initial setup phase — no application code has been committed yet.

Repository: `erick781/Partenaire.io`

## Repository Status

This project is **newly initialized**. The following sections document conventions and guidelines that AI assistants should follow when contributing to this codebase. Update this file as the project evolves.

## Development Workflow

### Branch Conventions

- Feature branches should follow the pattern: `claude/<description>-<session-id>`
- Always develop on the designated feature branch, never push directly to `main`
- Use clear, descriptive commit messages summarizing the "why" of changes
- Push with: `git push -u origin <branch-name>`

### Getting Started (once the project has code)

```bash
# Clone and install dependencies
git clone <repo-url>
cd Partenaire.io
# Follow setup instructions below once a framework is chosen
```

## Guidelines for AI Assistants

### General Principles

- **Read before writing**: Always read existing files before modifying them
- **Minimal changes**: Only make changes that are directly requested or clearly necessary
- **No over-engineering**: Avoid adding features, abstractions, or "improvements" beyond what was asked
- **Security first**: Never introduce command injection, XSS, SQL injection, or other OWASP top 10 vulnerabilities
- **No secrets in code**: Never commit `.env` files, API keys, credentials, or tokens
- **Preserve conventions**: Match existing code style, naming patterns, and project structure

### Code Style

- Follow the linter and formatter configuration once established
- Match existing indentation and formatting in any file you edit
- Do not add comments, docstrings, or type annotations to code you did not change
- Only add comments where logic is not self-evident

### Commit Practices

- Write concise commit messages (1–2 sentences) focused on "why" not "what"
- Stage specific files rather than using `git add -A`
- Never skip pre-commit hooks
- Create new commits rather than amending unless explicitly asked

### Testing

- Run the test suite before considering a task complete
- Do not mark a task as done if tests are failing
- Add tests for new functionality when a testing framework is in place

## Architecture (to be updated)

_This section should be updated once the tech stack and project structure are established._

Suggested sections to add:
- Tech stack (framework, language, database, etc.)
- Directory structure
- API patterns
- Database schema / ORM setup
- Authentication approach
- Deployment configuration
- Environment variables reference
- CI/CD pipeline

## Key Files Reference (to be updated)

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file — AI assistant guide |
| `package.json` | Dependencies and scripts (once created) |
| `.env.example` | Environment variable template (once created) |

## Common Tasks (to be updated)

```bash
# Build the project
# npm run build

# Run development server
# npm run dev

# Run tests
# npm test

# Lint code
# npm run lint
```

_Uncomment and update the commands above once the project tooling is in place._
