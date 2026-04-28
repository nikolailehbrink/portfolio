# Claude Code Tips & Tricks - Reddit & Community Research

> **Status: removable scratch.** Working notes used while writing
> [`src/content/blog/claude-code-tips/article.mdx`](../../../src/content/blog/claude-code-tips/article.mdx).
> Safe to delete once the post is finalized — not referenced from production code.

Research compiled from Reddit (r/ClaudeAI, r/ClaudeCode, r/ChatGPTCoding), GitHub repos, Substack, DEV Community, Medium, and developer blogs. Focus on practical, community-discovered tips that go beyond standard documentation.

---

## Context Management

### Start Fresh Conversations Often

- Use `/clear` every time you start a new task or topic. Stale context degrades output quality.
- "AI context is like milk - best served fresh and condensed." Long conversations accumulate noise and the model loses focus on older parts (the "lost-in-the-middle" effect).
- Effective context is typically only 50-60% of the stated limit. Start compacting or clearing around 60% usage.
- Source: ykdojo/claude-code-tips, r/ClaudeCode power users

### Proactive Compaction & Handoff Documents

- Don't trust automatic compaction - it's "opaque, error-prone, and not well-optimized."
- Before clearing, ask Claude to write a handoff document (HANDOFF.md) summarizing: what the goal is, what's been done, what worked, what didn't, and next steps.
- Create a custom `/handoff` slash command that automates this: checks for existing HANDOFF.md, reads it, then creates/updates with current session progress.
- In a new session, Claude loads the handoff file and picks up exactly where you left off, but with fresh context.
- Source: agenticcoding.substack.com, blog.sshh.io

### Monitor Context Usage with /context

- Run `/context` mid-session to audit token usage. In a monorepo, baseline initialization alone can consume ~20k tokens, leaving 180k for actual work.
- MCP tools consume 8-30% of context just by being available, even when unused. Remove MCP servers you don't actively need.
- Auto-compact buffer defaults to 32k tokens (22.5% of 200k window). Maximizing output tokens increases the buffer to ~40%.
- Source: dev.to advent calendar, blog.sshh.io

### Recite Objectives to Fight Context Drift

- During long sessions, periodically re-state your goals. Claude Code uses system reminders and todo lists to inject objectives into recent context, combating "lost-in-the-middle" drift.
- If Claude seems to forget what it's doing, explicitly remind it of the goal rather than assuming it remembers.
- Source: sankalp.bearblog.dev

---

## CLAUDE.md & Configuration

### Keep CLAUDE.md Simple and Under 200 Lines

- A bloated CLAUDE.md wastes context tokens. Target under 200 lines, ideally closer to 60 for strict adherence.
- Start with NO CLAUDE.md. Add to it only when you find yourself repeating the same instruction to Claude.
- Let Claude edit the file itself based on your prompts rather than manually maintaining it.
- Source: r/ClaudeCode, shanraisshan/claude-code-best-practice

### Treat CLAUDE.md as a Constitution, Not a Manual

- Include only behavioral rules, coding standards, and workflow patterns - not comprehensive documentation.
- Avoid @-mentioning full docs files. Instead, tell Claude WHEN and WHY to read external files: "For complex usage or if you encounter FooBarError, see path/to/docs.md"
- Replace negative constraints ("Never use X") with positive alternatives - agents get stuck on negatives.
- Source: blog.sshh.io

### Use Hierarchical CLAUDE.md Files

- In monorepos, place a root-level CLAUDE.md and subdirectory-specific ones. Claude loads the most specific (most nested) version with priority.
- Use `.claude/rules/` directory for topic-specific rules as separate Markdown files with glob-pattern matching for conditional application to specific file paths.
- Source: r/ClaudeCode, official docs

### Update CLAUDE.md at End of Sessions

- After a productive session, ask Claude to update CLAUDE.md with anything it learned about the project that wasn't captured before.
- This creates a compounding knowledge effect across sessions.
- Source: Multiple Reddit discussions, community consensus

### Block Dangerous Commands in Settings

- Configure `permissions.deny` in `~/.claude/settings.json` to block dangerous commands like `rm -rf`, `DROP TABLE`, `DELETE FROM`.
- Use `/sandbox` to restrict file system and network access to the working directory only.
- Periodically audit your approved commands with `/permissions`.
- Source: dev.to advent calendar, r/ClaudeCode

---

## Prompting & Execution Strategies

### Plan Before You Build

- Never let Claude write code until you've reviewed and approved a written plan. Use Plan Mode (`Shift+Tab`) to force a design step.
- In Plan Mode, Claude cannot write, modify, or execute anything - it's forced to think first.
- Plans are saved to `~/.claude/plans/` and can be opened in an external editor with `Ctrl+G`.
- The 2 minutes spent planning saves 20 minutes of refactoring later.
- Source: r/ClaudeCode, builder.io, community consensus

### Use ultrathink for Complex Tasks

- Only `ultrathink` triggers extended thinking mode since v2.0.0. Previous keywords like "think" or "think hard" are disabled.
- Use it for architectural decisions, complex debugging, and rigorous analysis.
- Source: dev.to advent calendar

### Multi-Pass Implementation Strategy

- Let Claude write a "throwaway first draft" end-to-end while you observe.
- Compare output against your mental model, identify divergences, then iterate with sharper prompts informed by what you learned.
- This reveals Claude's decision-making biases and produces better second attempts.
- Source: sankalp.bearblog.dev

### Give Claude a Way to Verify Its Work

- This feedback loop will 2-3x the quality of the final result.
- Have Claude write tests alongside code (TDD style).
- Ask Claude to create draft PRs for review before marking ready.
- Request Claude to "prove this works" using diffs.
- Source: r/ClaudeCode, official best practices

### After Mediocre Results, Ask for Elegance

- When first output is okay but not great: "Knowing everything now, scrap this and implement elegantly."
- Challenge with adversarial questions: "Grill me on these changes."
- Most bugs resolve with minimal guidance - paste the bug, say "fix," avoid micromanaging implementation.
- Source: shanraisshan/claude-code-best-practice

---

## Workflows & Productivity

### Parallel Development with Git Worktrees

- Use `claude --worktree` to run Claude in its own git worktree for isolation.
- Spin up 3-5 worktrees at once, each running its own Claude session in parallel. This is the single biggest productivity unlock according to the Claude Code team.
- Pass `--tmux` flag to launch Claude in its own tmux session.
- Source: Boris Cherny (Claude Code creator) on Threads, r/ClaudeCode

### Terminal Tabs for Multitasking

- Manage multiple Claude Code instances using terminal tabs.
- Follow a "cascade" approach: open new tasks to the right, sweep through them left to right.
- Effectively manage 3-4 concurrent tasks this way.
- Source: ykdojo/claude-code-tips

### Set Up Terminal Aliases

- Create shortcuts: `c` for Claude Code, `ch` for Chrome mode, `gb` for GitHub Desktop, `co` for VS Code, `q` for project directory.
- Small friction reduction compounds over hundreds of daily invocations.
- Source: ykdojo/claude-code-tips, r/ClaudeCode

### Use Custom Slash Commands for Repeated Workflows

- Create Markdown files in `.claude/commands/` for any workflow you repeat multiple times a day.
- Examples: `/new-component` to scaffold React components, `/code-review` for PR reviews, `/catchup` to resume from handoff docs.
- Treat it like writing an SOP for your AI assistant.
- Source: r/ClaudeCode, official docs

### Ctrl+G for External Editor

- Press `Ctrl+G` to open prompts or Plan documents in your preferred editor (VS Code, Vim, etc.).
- Configure with `VISUAL` or `EDITOR` environment variables.
- Useful for writing detailed multi-paragraph prompts.
- Source: dev.to advent calendar

### Ctrl+R for Prompt History Search

- Find past prompts across all project conversations.
- Useful when you remember giving a good prompt but can't recall the exact wording.
- Source: blog.sshh.io

### Checkpointing with Esc+Esc or /rewind

- Rewind to specific conversation points. Useful for exploring alternative approaches without losing progress.
- Source: blog.sshh.io, sankalp.bearblog.dev

---

## Skills, Hooks & Advanced Features

### Skills > MCP for Most Use Cases

- Skills package domain expertise into folders with SKILL.md files. Claude loads them on-demand when relevant.
- Keep SKILL.md under 500 lines, include concrete examples, and use progressive disclosure.
- Skills formalize the "scripting" layer, giving agents access to raw environment rather than abstract tool APIs.
- If you do something more than once a day, turn it into a skill.
- Source: blog.sshh.io, dev.to advent calendar

### PostToolUse Hooks for Auto-Formatting

- Configure hooks to run formatters (Prettier, ESLint) automatically after file edits.
- Ensures consistent code quality without consuming context tokens for formatting instructions.
- Source: dev.to advent calendar

### PreToolUse Hooks for Safety

- Implement hooks that scan for API keys, credentials, and sensitive information before they're committed.
- Wrap git commits with hooks that check for test pass files, forcing test-and-fix loops.
- Source: dev.to advent calendar, blog.sshh.io

### Use Gemini CLI as Fallback for Blocked Sites

- Create a skill that instructs Claude to use Gemini CLI via tmux when WebFetch can't access certain sites (Reddit, paywalled content).
- Gemini has broader web access and can fetch content Claude can't reach directly.
- Source: ykdojo/claude-code-tips

### Send Tasks to Web with &

- Prefix prompts with `&` to offload tasks to Claude Code on the Web for remote sandbox execution while continuing local work.
- Source: dev.to advent calendar

### /btw for Side Conversations

- Enable parallel conversations while Claude works on a primary task without interrupting the agentic loop.
- Source: shanraisshan/claude-code-best-practice

---

## Subagents

### Prefer Built-in Task Delegation Over Custom Subagents

- Skip custom subagents for most tasks. They hide context from the main agent, preventing holistic reasoning.
- Use Claude's built-in `Task(...)` feature to spawn general agent clones with full context from CLAUDE.md.
- Let the agent decide when and how to delegate dynamically ("Master-Clone" architecture).
- Source: blog.sshh.io

### When Custom Subagents Make Sense

- Give each subagent one clear goal, input, output, and handoff rule.
- Descriptions should be action-oriented: "Use after a spec exists; produce an ADR and guardrails."
- Create feature-specific subagents with progressive-disclosure skills rather than general QA or engineering roles.
- Source: shanraisshan/claude-code-best-practice, various community posts

### Async Subagents for Parallel Work

- Execute subagents asynchronously in background since v2.0.60. Notifications arrive upon completion.
- Use for parallel code reviews, exploration tasks, and read-only operations.
- Source: dev.to advent calendar

---

## Debugging & Verification

### Share Screenshots When Stuck

- Habit-form screenshot-sharing with Claude when debugging - visual context dramatically improves problem diagnosis.
- Use Chrome DevTools MCP for browser debugging with log inspection.
- Source: shanraisshan/claude-code-best-practice

### Cross-Model Verification

- Use Claude for implementation but a different model (e.g., GPT/Codex) for code review.
- Different models catch different issues, improving overall reliability.
- Source: blog.sshh.io, sankalp.bearblog.dev

### Interactive PR Reviews

- Retrieve PR information with `gh` commands, then conduct conversational reviews file-by-file.
- Let Claude review pull requests interactively - it can suggest improvements and explain changes.
- Source: ykdojo/claude-code-tips

---

## Copy-Paste & Input Tricks

### Cmd+A / Ctrl+A for Inaccessible Content

- When Claude can't fetch a URL (private pages, Reddit, paywalled content), select all content on the page, copy, and paste directly into Claude Code.
- Also works for terminal output and email threads.
- Source: ykdojo/claude-code-tips, r/ClaudeCode community

### Use Notion to Preserve Links

- When copying content with hyperlinks, paste into Notion first to preserve link formatting, then copy from Notion into Claude.
- Source: ykdojo/claude-code-tips

### Voice Input for Faster Communication

- Use local voice transcription (SuperWhisper, MacWhisper, Wispr Flow) for faster prompting.
- Claude is intelligent enough to interpret transcription errors.
- Built-in `/voice` mode (beta) also available.
- Source: ykdojo/claude-code-tips, r/ClaudeCode

---

## Safety & Permissions

### Use /sandbox for Isolation

- Restrict file system and network access to working directory and explicitly permitted paths.
- Reduces permission prompts through file and network isolation.
- Source: dev.to advent calendar, shanraisshan/claude-code-best-practice

### Wildcard Permissions Instead of Skip

- Use `/permissions` with wildcard syntax (e.g., `Bash(npm run *)`) instead of `--dangerously-skip-permissions`.
- Grants convenience without sacrificing all safety.
- Source: shanraisshan/claude-code-best-practice

### Run Risky Tasks in Containers

- Use Docker containers for experimental or unsupervised work.
- Can safely use `--dangerously-skip-permissions` inside containers.
- Source: ykdojo/claude-code-tips

---

## Project Management & Meta

### Search Conversation History

- Conversations are stored locally in `~/.claude/projects/` as .jsonl files.
- Search with grep or ask Claude directly to find past discussions.
- Source: ykdojo/claude-code-tips

### Use /insights for Usage Analytics

- View stats about your Claude Code usage patterns.
- Source: official features

### Scheduled Tasks with /loop

- Run prompts on recurring schedules up to 3 days.
- Poll deployments, babysit PRs, check builds autonomously.
- Source: shanraisshan/claude-code-best-practice

### GitHub Actions Integration

- Claude Code GitHub Action supports all advanced features (Hooks, MCP, Skills).
- Complete audit logs enable a flywheel: Bugs -> Improved CLAUDE.md -> Better Agent.
- Query logs to identify common mistakes across your organization.
- Source: blog.sshh.io

### Daily Update Habit

- Update Claude Code frequently and read the changelog. The platform evolves rapidly and new features drop regularly.
- Source: shanraisshan/claude-code-best-practice, r/ClaudeCode

---

## Terminal & Environment

### Prefer Terminal Over IDE Integration

- Power users prefer iTerm/Ghostty/tmux over VS Code/Cursor integration for faster iteration.
- Run Claude in a separate terminal window alongside your editor.
- Source: shanraisshan/claude-code-best-practice, r/ClaudeCode

### Custom Status Line

- Display model, directory, git branch, uncommitted files, token usage percentage with a progress bar below the chat input.
- Helps monitor context consumption and remember current work context.
- Source: ykdojo/claude-code-tips

### Use realpath for Absolute Paths

- Run `realpath` to convert relative file paths to full absolute paths when referencing files in different folders.
- Eliminates ambiguity in file references.
- Source: ykdojo/claude-code-tips

---

## Community Wisdom (Meta-Tips)

### The Best Way to Get Better Is Practice

- Consuming tokens and building intuition through real usage beats theoretical study.
- Understanding system reminders, context rot, tool calling mechanics, and sub-agent spawning helps you steer models better, but actual mastery comes from repeated experimentation.
- Source: Multiple Reddit threads, ykdojo/claude-code-tips

### Choose the Right Level of Abstraction

- Balance "vibe coding" for non-critical work with detailed code inspection for important systems.
- Sometimes high-level goals work better; other times explicit step-by-step instructions are necessary.
- Match instruction specificity to task importance.
- Source: ykdojo/claude-code-tips, community consensus

### Use AI for Grunt Work, Stay Hands-On for Core Logic

- Claude Code excels at data transformation, boilerplate, scaffolding, and tedious refactoring.
- Reserve manual coding for core business logic, state management, and anything that teaches you something.
- The real risk is becoming "passive consumers of generated code without understanding what we're shipping."
- Source: cekrem.github.io, r/ClaudeAI

### Invest in Your Own Workflow

- Build personalized tools, maintain CLAUDE.md, create custom skills and commands.
- Small investments in setup pay dividends over time.
- If you do something more than once, automate it.
- Source: ykdojo/claude-code-tips, community consensus

---

## Key Sources

- [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) - 45 tips from basics to advanced
- [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Comprehensive best practices repo
- [32 Claude Code Tips (Substack)](https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to) - YK's tip collection
- [24 Claude Code Tips Advent Calendar (DEV)](https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5) - Daily tip series
- [How I Use Every Claude Code Feature (blog.sshh.io)](https://blog.sshh.io/p/how-i-use-every-claude-code-feature) - Power-user deep dive
- [Claude Code 2.0 Guide (sankalp.bearblog.dev)](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/) - Real-world experience
- [How I Use Claude Code (builder.io)](https://www.builder.io/blog/claude-code) - Steve Sewell's workflow
- [Claude Code: Game Changer or Hype? (cekrem.github.io)](https://cekrem.github.io/posts/claude-code-game-changer-or-just-hype/) - Balanced practical take
- [r/ClaudeAI](https://reddit.com/r/ClaudeAI) - 4,200+ weekly contributors
- [r/ClaudeCode](https://reddit.com/r/claudecode) - Dedicated Claude Code subreddit
