# Frontend Design Tips for Claude Code - Research Notes

> **Status: removable scratch.** Working notes used while writing
> [`src/content/blog/claude-code-tips/article.mdx`](../../../src/content/blog/claude-code-tips/article.mdx).
> Safe to delete once the post is finalized — not referenced from production code.

Research compiled on 2026-03-16 from blog posts, community discussions, official Anthropic resources, and developer experience reports.

---

## 1. The Core Problem: "AI Slop" Defaults

Without explicit design guidance, Claude Code consistently generates the same generic aesthetic:

- **Inter/Roboto/Open Sans** as the font
- **Purple gradients on white backgrounds**
- Minimal animations
- Grid card layouts
- Cookie-cutter component patterns

This happens because of "distributional convergence" - during sampling, models predict tokens based on statistical patterns in training data, and safe/generic design choices dominate web training data. Without direction, Claude samples from this high-probability center.

**Source:** [Prompting for Frontend Aesthetics - Anthropic Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)

---

## 2. The Official `/frontend-design` Skill

Anthropic's built-in frontend-design skill (277,000+ installs as of March 2026) is the single most impactful tool for improving UI output.

### What It Does

- Gives Claude a design philosophy _before_ it writes any code
- Forces Claude to commit to a bold conceptual direction before implementation
- Provides rules for typography, color, motion, and spatial composition
- Explicitly tells Claude to avoid its default generic patterns

### How to Install

```bash
npx skills add anthropics/claude-code -- skill frontend-design
```

Or invoke with `/frontend-design` if already installed.

### Key Rules from the SKILL.md

- **Choose an extreme aesthetic tone:** brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, or industrial/utilitarian
- **Typography:** Never use generic fonts (Inter, Roboto, Arial, system fonts). Choose distinctive display fonts paired with refined body fonts (e.g., JetBrains Mono, Space Grotesk, Playfair Display, Crimson Pro, Fraunces)
- **Color:** Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes
- **Motion:** High-impact animations at key moments. One well-orchestrated page load with staggered reveals beats scattered micro-interactions
- **Backgrounds:** Layer CSS gradients, geometric patterns, or contextual effects instead of solid colors
- **Implementation complexity should match the aesthetic:** Maximalist designs need elaborate code; minimalist designs need restraint, precision, and careful spacing

The skill is principle-based and evocative rather than prescriptive - this balance fuels creativity while maintaining structure, producing way more thoughtful initial output than default behavior.

**Sources:**
- [Official SKILL.md on GitHub](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
- [Improving Frontend Design Through Skills - Anthropic Blog](https://claude.com/blog/improving-frontend-design-through-skills)
- [Frontend Design Plugin](https://claude.com/plugins/frontend-design)

---

## 3. Three Prompting Strategies That Actually Work

From Anthropic's official "Prompting for Frontend Aesthetics" cookbook:

### Strategy 1: Guide Specific Design Dimensions

Direct Claude's attention to typography, color, motion, and backgrounds individually rather than saying "make it look good."

Example: _"Use a warm color palette with amber and cream tones. Pick a serif display font for headings and a geometric sans-serif for body text. Add subtle fade-in animations on scroll."_

### Strategy 2: Reference Design Inspirations

Suggest real-world references like IDE themes, cultural aesthetics, specific websites, or design movements. Don't be overly prescriptive - give Claude room to interpret.

Example: _"Take inspiration from Japanese minimalism and editorial magazine layouts."_

### Strategy 3: Call Out Common Defaults to Avoid

Explicitly tell Claude what NOT to do. This is surprisingly effective.

Example: _"Do not use Inter, Roboto, or system fonts. Avoid purple gradients. Don't use a plain white background. Skip generic card grid layouts."_

The key insight: **overly prescriptive instructions produce worse results**. Balance structure with creative freedom.

**Source:** [Prompting for Frontend Aesthetics - Anthropic Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) | [GitHub notebook](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb)

---

## 4. CLAUDE.md Frontend Rules

Including frontend-specific rules in your CLAUDE.md or AGENTS.md prevents Claude from generating code with hardcoded colors instead of design system variables, or one-off layout rules instead of using existing components.

### What to Include

- **Component directory structure** and naming conventions
- **Design token enforcement** (e.g., "never hardcode hex values, always use CSS variables or Tailwind tokens")
- **Spacing scales** and sizing systems
- **Tailwind conventions** for your project
- **Font choices** and typography scale
- **Existing component library** references so Claude uses what you have instead of creating new ones

### Example Rules

```markdown
## Design System
- Use CSS variables from `globals.css` for all colors - never hardcode hex values
- Use the `cn()` utility for conditional class names
- All spacing uses Tailwind's default scale (4, 8, 12, 16, 24, 32, 48, 64)
- Fonts: Space Grotesk for headings, Inter for body (loaded via next/font)
- Always use existing shadcn/ui components before creating custom ones
```

**Source:** [CLAUDE.md Best Practices - UX Planet](https://uxplanet.org/claude-md-best-practices-1ef4f861ce7c)

---

## 5. Visual Feedback Loops (Browser + Screenshots)

Giving Claude Code the ability to _see_ its own output is a game-changer for frontend work. This closes a fundamental feedback loop: write code, render it, capture what the browser produced, inspect the result.

### Chrome Integration (Native)

Claude Code integrates with the Chrome browser extension to provide browser automation from the CLI. Build code, then test and debug in the browser without switching contexts.

**Source:** [Claude Code Chrome Docs](https://code.claude.com/docs/en/chrome)

### Chrome DevTools MCP

The `chrome-devtools-mcp` server gives Claude direct access to Chrome through the DevTools Protocol:

- Control the browser (click, fill forms, navigate)
- Capture screenshots at any viewport size
- Monitor network requests and responses
- Read console logs in real-time
- Measure Core Web Vitals (INP, LCP, CLS)
- Validate accessibility trees
- Emulate mobile devices with throttled networks

This is particularly powerful for responsive design work - Claude can screenshot at multiple breakpoints and fix layout issues without you manually checking.

**Source:** [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | [Claude Code Browser MCP Setup](https://github.com/haasonsaas/claude-code-browser-mcp-setup)

### Round-Trip Screenshot Testing

After making frontend changes, Claude runs tests with automatic screenshot capture, then visually examines every screenshot to verify the UI looks correct. This works especially well for:

- Catching visual regressions
- Verifying responsive breakpoints
- Checking dark mode / light mode rendering
- Validating animation states

**Source:** [Giving Claude Code Eyes: Round-Trip Screenshot Testing](https://medium.com/@rotbart/giving-claude-code-eyes-round-trip-screenshot-testing-ce52f7dcc563) | [Visual Feedback Loop for Electron Apps](https://juri.dev/articles/visual-feedback-loop-electron-apps-claude-code/)

---

## 6. Figma Integration

### Figma MCP Server

When connected via the Figma MCP server, Claude can pull structured design context directly from your Figma files - not just screenshots but components, variables, styles, and layout structure. This generates code that actually matches your mockups.

### Code to Canvas (Bidirectional)

Announced February 2026, the Claude Code-to-Figma integration lets you capture a functioning UI built with Claude Code and convert it into fully editable Figma frames. The pipeline flows both ways.

### Practical Workflow

1. Design in Figma
2. Connect Figma MCP to Claude Code
3. Claude reads components, variables, styles, layout structure
4. Claude generates code matching the design
5. Iterate: update in Figma, Claude pulls latest tokens and regenerates

**Sources:**
- [Claude Code + Figma MCP Server - Builder.io](https://www.builder.io/blog/claude-code-figma-mcp-server)
- [From Claude Code to Figma - Figma Blog](https://www.figma.com/blog/introducing-claude-code-to-figma/)
- [Figma Claude Connector](https://claude.com/connectors/figma)

---

## 7. Third-Party Design Skills

### UI/UX Pro Max

A comprehensive design intelligence skill that gives Claude a searchable design database:

- 50+ UI styles (glassmorphism, claymorphism, brutalism, neumorphism, bento grid, etc.)
- 97 color palettes
- 57 font pairings
- 99 UX guidelines
- 25 chart types
- Support for 9 tech stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui)

The v2.0 flagship feature is a Design System Generator that analyzes project requirements and generates a complete tailored design system. Ships with a Python CLI tool that Claude queries.

**Source:** [UI UX Pro Max](https://ui-ux-pro-max-skill.nextlevelbuilder.io/) | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

### Impeccable

Positioned as "the missing upgrade to Anthropic's frontend-design skill" with additional design refinements.

**Source:** [Impeccable](https://impeccable.style/)

### Custom Design System Skills

You can create your own skill that encodes your company's exact design system, component patterns, and conventions. This transforms design decisions into reusable assets your entire team can leverage.

One developer reported turning a single design into a reusable Claude skill in 15 minutes that could then redesign everything consistently.

**Source:** [How I Turned One Design Into a Claude Skill That Redesigns Everything](https://www.nathanonn.com/claude-skill-design-system-reusable-frontend/)

---

## 8. Component Libraries (shadcn/ui + Tailwind)

### Why shadcn/ui Works Well with Claude Code

- Components are copied into your codebase (not installed as a package) - you own and control the code
- Built on Radix UI primitives (accessible by default)
- Uses Tailwind utilities natively, so design tokens and responsive classes work out of the box
- Incremental adoption - generate only the primitives you need
- Claude can reference your local shadcn components and extend them rather than generating from scratch

### Best Practices

- Create shared wrapper components that extend base shadcn components with your project's variants
- Avoid boolean prop proliferation - use composition patterns: compound components, context providers, explicit variants
- Keep components focused and single-purpose
- Use consistent spacing and sizing scales
- Implement responsive breakpoints systematically
- Use design tokens instead of magic numbers

### Tailwind v4 Considerations

With Tailwind v4, configuration has moved to CSS-first (no more `tailwind.config.js`). All configuration happens in the main CSS file. Make sure your CLAUDE.md reflects this so Claude doesn't try to edit a config file that doesn't exist.

---

## 9. Dark Mode, Responsive Design, and Animations

### Dark Mode

- Implement with CSS variables and React context
- When using dark/light mode, verify contrast is correct
- Check that glass/translucent elements remain visible in light mode
- Claude can automatically generate accessible dark mode variants when given proper design tokens

### Responsive Design

- Use Tailwind's container queries for responsive variants
- Claude handles repetitive responsive variant generation well
- Use the Chrome DevTools MCP to screenshot at multiple viewport sizes and verify layouts
- Specify your breakpoint strategy in CLAUDE.md

### Animations

The difference between "this looks fine" and "wow, this feels premium":

- Focus on high-impact moments (page load orchestration, section reveals)
- Spring physics > linear easing
- Skills cover Framer Motion, GSAP, and CSS animations
- Include: staggered reveals, scroll-triggered effects, micro-interactions, page transitions, skeleton loaders
- Prefer CSS-only solutions for HTML; Motion library for React
- Reduced-motion support is mandatory (accessibility)

**Source:** [Snyk - Top 8 Claude Skills for UI/UX Engineers](https://snyk.io/articles/top-claude-skills-ui-ux-engineers/)

---

## 10. Workflow Tips from Practitioners

### "Get Shit Done" Meta-Prompting Framework

Break work into phases with fresh contexts to prevent degradation as conversation gets longer:

1. **Research** - understand requirements
2. **Planning** - architect the solution
3. **Execution** - build it
4. **Verification** - test and review

Each phase gets its own clean context window. Use `/clear` between different tasks.

**Source:** [Claude Code for Designers - Nervegna Substack](https://nervegna.substack.com/p/claude-code-for-designers-a-practical)

### Use "Think Hard" for Complex Design Decisions

The phrase "think hard" gives Claude more computational budget to reason through problems. Use this when making complex design decisions like layout architecture or component composition.

**Source:** [Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)

### Start with a Plan

Ask Claude to create a detailed implementation plan before coding. For frontend work, this means specifying the design direction, component hierarchy, and interaction patterns before any code is generated.

### Reference Existing Components

Always point Claude to your existing components and design system. Without this context, it creates new one-off implementations instead of reusing what you have.

### Accessibility by Default

The frontend-design skill and related guidelines include 100+ rules on accessibility: proper ARIA attributes, visible focus states, labeled inputs, touch target sizes, reduced-motion support, and semantic HTML.

---

## 11. Key Resources

### Official Anthropic

- [Prompting for Frontend Aesthetics Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- [Improving Frontend Design Through Skills Blog Post](https://claude.com/blog/improving-frontend-design-through-skills)
- [Frontend Design SKILL.md on GitHub](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
- [Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Claude Code Chrome Integration](https://code.claude.com/docs/en/chrome)

### Community Guides

- [I Figured Out How to Get Consistently Good UI from Claude Code - DEV Community](https://dev.to/oyindamola_akinleye_b3f62/i-figured-out-how-to-get-consistently-good-ui-from-claude-code-3b9p)
- [Claude Code for Designers - Builder.io](https://www.builder.io/blog/claude-code-for-designers)
- [How I Use Claude Code (+ My Best Tips) - Builder.io](https://www.builder.io/blog/claude-code)
- [How I Turned One Design Into a Claude Skill That Redesigns Everything - nathanonn.com](https://www.nathanonn.com/claude-skill-design-system-reusable-frontend/)
- [Claude Code for Designers: A Practical Guide - Nervegna Substack](https://nervegna.substack.com/p/claude-code-for-designers-a-practical)
- [Claude Code Skills: Install UI Skills + Build a /frontend-design Workflow - DEV Community](https://dev.to/blamsa0mine/claude-code-skills-install-ui-skills-build-a-frontend-design-workflow-claude-code-cursorvs-4n43)
- [10 Must-Have Skills for Claude in 2026 - Medium](https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-coding-agent-in-2026-b5451b013051)
- [Giving Claude Code Eyes: Round-Trip Screenshot Testing - Medium](https://medium.com/@rotbart/giving-claude-code-eyes-round-trip-screenshot-testing-ce52f7dcc563)
- [Claude Code for Web Design - UX Planet](https://uxplanet.org/claude-code-for-web-design-338064dbdfc0)
- [Complete Guide: Build a Claude Code Frontend Design Skill - AIFeeFee](https://aifeefee.com/complete-guide-building-a-claude-code-frontend-design-skillset-from-scratch/)
- [7 Claude Code Best Practices for 2026 - eesel.ai](https://www.eesel.ai/blog/claude-code-best-practices)
- [Visual Feedback Loop for Electron Apps - juri.dev](https://juri.dev/articles/visual-feedback-loop-electron-apps-claude-code/)
- [I Design with Claude More Than Figma Now - Jane Street Blog](https://blog.janestreet.com/i-design-with-claude-code-more-than-figma-now-index/)

### Tools & Skills

- [UI/UX Pro Max Skill](https://ui-ux-pro-max-skill.nextlevelbuilder.io/)
- [Impeccable - Frontend Design Skill Upgrade](https://impeccable.style/)
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Claude Code + Figma MCP - Builder.io](https://www.builder.io/blog/claude-code-figma-mcp-server)
- [Claude Code Frontend Design Toolkit - GitHub](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit)
- [Claude Visual Style Guide - GitHub](https://github.com/jcmrs/claude-visual-style-guide)
- [Claude Code UI Agents Prompts Collection - GitHub](https://github.com/mustafakendiguzel/claude-code-ui-agents)
