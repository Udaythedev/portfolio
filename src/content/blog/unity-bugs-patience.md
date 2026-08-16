---
title: Three Unity Bugs That Taught Me Patience
date: '2026-08-10'
excerpt: 'A couple lessons from shipping a horror short — bugs, not features.'
tags: ['game-dev', 'unity']
---

# Three Unity Bugs That Taught Me Patience

Shipping a horror short in Unity taught me more than any tutorial ever did — mostly because the bugs were annoying enough to force me into better patterns.

## 1. The NullReference You Can't Reproduce

Spawns randomly, only when two specific systems run in parallel. Turns out I was reading a component before it finished initializing on a new scene load. Solution: stop assuming everything exists at start — use `TryGetComponent` everywhere and add a proper startup sequence.

**Lesson:** Silent failures are worse than loud ones. Log your assumptions.

## 2. Coroutines Are Not Threads

They look like they run in parallel. They don't. Everything still runs on the main thread, just deferred across frames. When I tried to use a coroutine for heavy calculation, the game locked up completely.

**Lesson:** Use `async/await` with `Task.Run` for real parallel work, or split heavy work across frames manually.

## 3. The Audio That Doesn't Pause

Menu music kept playing over cutscenes. I spent an hour tracking it down only to realize I had created a second audio source that never got disabled.

**Lesson:** Centralize audio management. One manager object, explicit enable/disable calls. Don't scatter `AudioSource` components around your scene and hope for the best.

---

Game dev is 10% coding, 90% debugging things that shouldn't have been possible.
