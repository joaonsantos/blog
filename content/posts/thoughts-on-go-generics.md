---
title: "Thoughts on Go Generics"
date: 2022-02-10T13:18:00+01:00
# weight: 1
# aliases: ["/first"]
tags: ["first"]
author: "Me"
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "A generic overview and some thoughts."
summary: "A generic overview and some thoughts."
canonicalURL: "https://blog.joaonsantos.dev/posts/thoughts-on-go-generics"
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

Go generics will be available in the official Go 1.18 release scheduled for
February of 2022. If you are reading this after the fact, generics might already
be available in a stable Go release and you probably already use them. Even if
that is the case you might learn something here.

Generics in Go are the most significant change to Go since releasing Go 1. The
Go team has managed to introduce this change while remaining fully backwards
compatible. Most importantly, after this change Go should still feel like Go,
according to the authors. This means that short build times and fast execution
times must be maintained while the clarity and simplicity of Go must not be
compromised.

These are lofty goals to achieve but the Go team has spent a considerable amount
of years working on this issue and iterated through several different design
proposals. In fact, one of the first proposals dates back to 2010 and can be
seen
[here](https://go.googlesource.com/proposal/+/master/design/15292/2010-06-type-functions.md),
for historical context.

To allow generics, Go has been extended with two new concepts: type parameters
and constraints. Type parameters can be used in type and function declarations.

Suppose you need to build a function that needs to find the maximum element
between two elements. Currently, we could define a function that takes the
largest possible value type, for example:
```go
func max(x, y float64) float64 {
  if x > y {
    return x
  }
  return y
}
```

If we are using integer types in our program, this function works well but it is
cumbersome to type cast values back and forth. Another possibility is that we
could write a version of this function where instead of `float64` parameters we
use `int` parameters.

Such a function would look like this:
```go
func max(x, y int) int {
  if x > y {
    return x
  }
  return y
}
```

Now suppose we have an instance where we must use `uint` types in our program.
We could once again implement a version of the function with `uint` and so on.

We can see that in all of these cases, if we choose to implement the functions,
they have exactly the same implementation and the only change is the type of the
values. This is one of the cases where we can consider using generics, according
to the Go team. For more information and general guidelines on when to use
generics in Go code, watch Ian Lance Taylor's talk titled ["Using Generics in
Go"](https://www.youtube.com/watch?v=nr8EpUO9jhw).

In practice, this is how a generic function that solves this problem looks like:
```go
func max[T constraints.Ordered](x, y T) T {
  if x > y {
    return x
  }
  return y
}
```

In this definition, max has a type parameter `T` and `x` and `y` are of this
type. The result is of type `T` as well. The syntax to define a type parameter
list uses square brackets. Inside, a type is declared along with its associated
constraints (think meta-type).

In practice, we define a generic type `T` that must fulfill some conditions.
These conditions are called constraints and in this case we use the `Ordered`
constraint. This constraint is given to us by a new package called
`constraints`, available since Go 1.18. The definition for this constraint is as
follows:
```go
// Ordered is a constraint that permits any ordered type: any type
// that supports the operators < <= >= >.
// If future releases of Go add new ordered types,
// this constraint will be modified to include them.
type Ordered interface {
	Integer | Float | ~string
}
```

There are some strange things happening here. In this case, `Integer` and
`Float` are some interfaces defined in the `constraints` package. `string` is
the old Go string type we all know. But before we fully explain what is
happening here, let's take a look at the definition for the `Float` interface.

The definition for the `Float` interface is as follows:
```go

// Float is a constraint that permits any floating-point type.
// If future releases of Go add new predeclared floating-point types,
// this constraint will be modified to include them.
type Float interface {
	~float32 | ~float64
}
```

This new interface defines that a Float constraint permits any float type. This
is done by using the union operator on the `float32` and `float64` types. The
`~` is a new symbol in Go and `~T` means all the types whose underlying type is
`T`. This means that even custom defined types fulfill this constraint. In this
case, any type whose underlying type is either a `float32` or a `float64`
satisfies this constraint.

We can now understand that the `Ordered` constraint is fulfilled by all types
whose underlying type is either an integer type, a float type or a string type.

One comparison I have heard is that constraints share a similar concept to
[Rust's traits](https://doc.rust-lang.org/book/ch10-02-traits.html). While in
some aspects this is true, take care as they are not exactly the same. In fact,
no other language, at the time of writing, allows embedding types in interfaces
to defined shared behaviours. This novel feature has been proven to be
theoretically sound with the [Featherweight Go
paper](https://arxiv.org/pdf/2005.11710.pdf).


Back to the topic, the usage of a generic max function looks like this:
```go
//
// func max[T constraints.Ordered](x, y T) T {...}
//
var x, y, m int

m = max[int](x, y)
```

Thankfully, the Go compiler is able to infer the argument types. The details of
type inference are complicated but using it we can make a generic function call
as simple as a regular function call:
```go
//
// func max[T constraints.Ordered](x, y T) T {...}
//
var x, y, m int

m = max(x, y)
```

A notable addition that comes with generics is the addition of a new predeclared
identifier `any`, as an alias for everyone's favorite interface `interface{}`.
This identifier originally was meant to only be used in constraints related
contexts but has since been extended for use throughout all Go code. For more
information, please take a look at this
[issue](https://github.com/golang/go/issues/33232).

As closing thoughts, I believe generics are a good addition to Go. There are
real problems caused by the lack of generics that impact mostly library authors.
General purpose data structures like trees and sets can now be defined without
implementing a new version every single time for every single existing type.

However, we must keep in mind that using generics adds complexity and using it
carelessly may lead to unnecessary complexity. First, we should consider if
using generics solves a real problem in our user code. We must remember that Go
already has a form of generic programming with interfaces, so we should reflect if
our problem can be solved just by using interfaces. In the end, we must maintain
a healthy allergy to using generics and only use them where approppriate.

For an overview of generics, I suggest viewing the GopherCon 2021 talk by Robert
Griesemer and Ian Lance Taylor titled
["Generics!"](https://www.youtube.com/watch?v=Pa_e9EeCdy8). For an in-depth
overview of the specification design please visit the [type parameters spec
design
proposal](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md).

Lastly, thank you for reading and hope this helps you to use generics wisely in
the future.
