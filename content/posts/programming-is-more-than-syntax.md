---
title: "Programming Is More Than Syntax"
date: 2022-06-13T13:08:26+01:00
# weight: 1
# aliases: ["/first"]
tags: ["opinion"]
author: "João Santos"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "What makes up a programming language."
summary: "What makes up a programming language."
canonicalURL: "https://blog.joaonsantos.dev/posts/programming-is-more-than-syntax"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
---

Learning a programming language can be a daunting task but it can also be an
interesting and rewarding journey. When entering into contact with a new
language for the first time it is easy to focus on the syntax for the usual
conditional and looping constructs as well as variable and function declaration.
It should be noted that a programming language syntax is indeed the result of
several design principles when building the language. This stands in contrast to
spoken and written languages that evolved naturally over the course of millions
of years of use.

Programming languages are the result of work from a small number of heavily
invested and opinionated people. When discussing this topic, the [Zen of
Python](https://www.python.org/dev/peps/pep-0020/) comes to mind. The Zen of
Python summarizes Python's guiding language design principles.

Some modern programming languages openly share these design principles to foster
a community of like-minded individuals that agree with these on a fundamental
level. Take for example the Go programming language. The [guiding principles of
Go](https://golang.org/doc/faq#principles) are described in the Go documentation
FAQ by the Go Authors.

> When Go was designed, Java and C++ were the most commonly used languages for
> writing servers, at least at Google. We felt that these languages required too
> much bookkeeping and repetition. Some programmers reacted by moving towards
> more dynamic, fluid languages like Python, at the cost of efficiency and type
> safety. We felt it should be possible to have the efficiency, the safety, and
> the fluidity in a single language.

This sentence explains the goal of the language as well as its purpose. It also
helps a developer to understand how idiomatic code could be written. Idiomatic
code is obtained by following the language idioms and therefore the subjacent
language design principles.

The Rust Project Developers also share a few general guidelines that define the
Rust language design philosophy:

- Memory safety must never be compromised
- Abstraction should be zero-cost, while still maintaining safety
- Praticality is key

Memory safety and abstraction are big problems. Developers can relate with this.
A community can be created naturally around these.

It turns out that, strong opinionated philosophies are a requirement for
fundamentally sound design.

It turns out that, programming is more than syntax.