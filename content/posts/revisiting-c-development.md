---
title: "Revisiting C Development"
date: 2022-06-13T13:15:44+01:00
# weight: 1
# aliases: ["/first"]
tags: ["c"]
author: "João Santos"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Reliving the wonder and pitfalls."
summary: "Reliving the wonder and pitfalls."
canonicalURL: "https://blog.joaonsantos.dev/posts/revisiting-c-development"
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

This year I have had the time to build a small personal project in the C
programming language. C-style languages have always been more interesting to me
than Object-oriented languages like Java, so I was eager to get started.

In fact, the syntax for some of the worlds most used programming languages today
have been inspired by C. Languages like Go, Rust and Zig are directly influenced
by its syntax and ideals. Python, for example, has a very strong interface with
C, since it calls C directly for performance critical operations. C has left its
legacy in the development world.

That is not to say C does not have its shortcomings. Most modern languages
provide a built-in toolchain around it to make developers lives easier.
Dependency management tools and compilation tools are standard development tools
when working in any source code. C does not provide any of that and you are free
to use several compiler toolchain and build systems that are available
externally. One downside to this approach is that some portability is lost. If
you use different operating systems you likely use different toolchains with
different capabilities.

The project I wanted to work on was the creation of a logger. At first glance a
logger seems like a simple library to create while providing much of the
experience of real C project development.

I wanted this logger to be inspired by Go's logger implementation. One important
design approach I wanted to follow is to have reasonable defaults. By using this
approach it is easy to use logging without requiring any complex configuration
work beforehand. If configuration is needed it can be done easily after
initialization.

To create a library in C you often split code into a header and a source file. I
set out to build the header file and ended up with this definition:
```c
#include <stdio.h>

#ifndef __libc_cllog_h
#define __libc_cllog_h

typedef struct lclog {
  char *prefix;
  FILE *out;

} lclog;

lclog *lclog_new(char *prefix);
void lclog_log(lclog *log, char *fmt, ...);

#endif /* __libc_cllog_h */
```

This interface defines a struct called `lclog` that represents a logger which
enables the user to configure a logging prefix and the logger output stream. A
function to create a new logger is defined, as well as, a function to log with
the logger. While this design is very simple it already allows powerful output
redirection features.

My research indicated that library header definitions typically use a concept
called *guard definitions*. This technique is used to avoid conflicting
definitions of an identifier or a function. In practice, `#ifndef` defines a
unique name for this definition section and guards the definition in the inner
code section until reaching the `#endif` declaration.

The next step was to implement the logger itself. The implementation is as
follows:
```c
#include <stdlib.h>
#include <stdio.h>
#include <stdarg.h>

#include <liblclog.h>

lclog *lclog_new(char *prefix) {
  lclog *log = malloc(sizeof(lclog));
  log->out = stdout;
  log->prefix = prefix;
  return log;
};

void lclog_log(lclog *log, char *fmt, ...) {
  // print prefix
  fprintf(log->out, "%s ", log->prefix);

  // print log message
  va_list ap;
  va_start(ap, fmt);
  vfprintf(log->out, fmt, ap);
  va_end(ap);

  // begin a new line
  fprintf(log->out, "\n");
};
```

This implementation was relatively straightforward. My design intent with
`lclog_new()` was to provide sensible defaults when creating a new logger. To
fulfill this, when a logger is created it outputs the messages to `stdout` and
sets the logging prefix to be the given prefix string.

The message logging function was more interesting. It makes use of variadic
functions which I had never used in C. Go programmers might recognize this
concept. This is a special type of function that receives a varying number of
arguments. To work with this type of arguments we must make use of `va_list` to
define the argument list. In this case I have used argument access macros like
`va_start` and `va_end` to make working with these types of arguments easier.
The argument list is then passed to `vfprintf` which prints the arguments with
format `fmt`.

To compile the source code I used `gcc` since it is widely available in Linux
systems. It was now necessary to create a build system, since `gcc` build
commands use many flags and it gets verbose very easily. For this purpose I have used
GNU Make.

The Makefile definition is as follow:
```makefile
# global options
Q=@

# c options
CC=gcc
CFLAGS=-Wall -Wextra -std=c99 -I.
SRC=lclog.c
DEPS=liblclog.h
OBJS=lclog.o
AR=ar
ARFLAGS=-rcs
TARGET=liblclog.a

# test options
TTARGET=test/

$(TARGET): $(OBJS)
	$(AR) $(ARFLAGS) $@ $^
	cp $(DEPS) $(TARGET) $(TTARGET)

$(OBJS): $(SRC) $(DEPS)
	$(CC) $(CFLAGS) -c -o $@ $<

.PHONY: clean
clean:
	rm -f *.a *.o
```

In this case, the build has two steps. First the object files are created and
then the object files are used to create a static library. The static library
file `liblclog.a` is created with `ar`. One fun fact for this command is that
its intended use was to create archive files, hence the name, but in this
specific use case it has been superseeded by `tar`.

The resulting library file and header is copied into the test directory for
testing.

With this we have a fully functioning logger. An example of library usage:
```c
#include <stdio.h>

#include <liblclog.h>

int main() {
  lclog *logger = lclog_new("[LOG]");
  lclog_log(logger, "Hello world!");
  return 0;
}
```

Which outputs
```
[LOG] Hello world!
```

This was a very rewarding project for me personally. Programming in C demands
careful examination of strings and memory patterns since it is very easy to make
insecure calls that might be exploitable by malicious parties. It also made me
miss the modern built-in toolchain present in modern languages like Go or Rust.

This project has filled me with a renewed appreciation for all the progress that
has been done on development accessibility without requiring any setup or
external tools. Program safety has also dramatically improved, especially so in
Rust.

If you want to check out the source code, feel free to visit the project page on
Github: <https://github.com/joaonsantos/lclog>.
