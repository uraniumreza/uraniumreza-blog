---
categories:
  - Software Development
  - Debugging
  - Git
date: "2020-05-11"
description: "Debug the problem from a long history of changes, tracked by Git, and find in which particular commit we've introduced the bug"
published: true
title: "Debug using git bisect"

---

![From Unsplash, photo by Yancy Min](https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2855&q=80)

# What's git bisect?
I just learned about [git bisect](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-bisect.html) from this [tweet](https://twitter.com/kefimochi/status/1259656631291277312) and from the very first look of it, I was like - whooosh! It should be awesome. From the `man` page, it says this -

```
TLDR; git-bisect - Use binary search to find the commit that introduced a bug
```

So, that's kind of our day-to-day software engineering need, amirite? In the middle of our development of a particular feature, somehow we stumbled in a situation where an existing code fragment is broken, but it shouldn't because we didn't touch (or actually couldn't remember) any related codes! What do we do then? I personally checkout to particular commits that I feel suspicious or check the file changes, but that's a hell lot of work to actually narrow down the bug. To automate this process, we can use `git bisect`.

This command uses a binary search algorithm to find which commit in our project’s history introduced a bug. First, we have to tell which one is the "bad" commit that is known to contain the bug, most of the cases that's where the *HEAD* is, but we can specify a commit hash as "bad" here! Also, we have to mark a "good" commit that we were sure about its condition before the bug was introduced. Then git bisect picks a commit between those two endpoints and asks us whether the selected commit is "good" or "bad". It continues narrowing down the range until it finds the exact commit that introduced the problem.

> In fact, git bisect can be used to find the commit that changed any property of our project; e.g., the commit that fixed a bug, or the commit that caused a benchmark’s performance to improve. To support this more general usage, the terms "old" and "new" can be used in place of "good" and "bad", or we can choose our own terms.

# How to use git bisect?
First, we have to start a bisect session as follows:

```
# startup git bisect
$ git bisect start
```

Suppose we are trying to find the commit that broke a feature that was known to work in `a09c728` and from `b6a0692` i.e. this two are the commit hash of good and bad commit. Now, after starting the git bisect session, we'll specify the good and bad commit-

```
# give git a commit where there is not a bug
git bisect good a09c728

# give git a commit where there is a bug
git bisect bad b6a0692
```

From here, the process will start automatically and git will start splitting the revisions in half and loading them up for us. It will checkout each revision and then ask us if the commit is good or bad. Our answer `git bisect good` or `git bisect bad`, will take care of the rest. It will use a binary search to very quickly narrow down the offending commit; will show something like this in the terminal-

```
Bisecting: 25 revisions left to test after this (roughly 5 steps)
[2f740f9d2180e9b151ddcfa4e461c87536c4e98c] Bind get-a-quote api
```
The number of revisions we have between our “good” and “bad commits” will determine how long this process takes but it will still be quicker than individually checking out each commit. Roughly it takes log<sub>2</sub>(numberOfRevisions). Now, we should compile the checked-out version and test it;

```
# If that version works correctly, type
$ git bisect good

# If that version is broken, type
$ git bisect bad

# Then git bisect will respond with something like
$ Bisecting: 12 revisions left to test after this (roughly 4 steps)
```
We have to keep repeating the process: compile, test, and depending on whether it is good or bad run `git bisect good` or `git bisect bad` to ask for the next commit that needs testing. And, eventually, there will be no more revisions left to inspect, and the command will print out a description of the first bad commit. The reference refs/bisect/bad will be left pointing at that commit.

```
a51a7c02db476f1733f9c12563b9ecf658e028e5 is the first bad commit
commit a51a7c02db476f1733f9c12563b9ecf658e028e5
Author: uraniumreza <reza.uranium@gmail.com>
Date:   Sun May 10 19:37:40 2020 +0600

    Add contact-us api

 src/helper/validation.js            |   9 +++
 src/landing/components/ContactUs.js |  52 +++++++++++++---
 src/landing/service/api.js          |  12 +++
 3 files changed, 73 insertions(+), 11 deletions(-)
```
After a bisect session, to clean up the bisection state and return to the original HEAD, we have to run the following command:
```
$ git bisect reset
```
By default, this will return our tree to the commit that was checked out before `git bisect start`. With an optional argument, we can return to a different commit instead:

```
$ git bisect reset <commit>
```

For example, `git bisect reset bisect/bad` will checkout to the first bad revision, while `git bisect reset HEAD` will leave us to the current bisection commit and avoid switching commits at all

# Can we automate the process?
That was basically a manual approach of debugging, though it helps us automating the checkout process and narrowing down the buggy commit effectively. But we can run git bisect with a script (if we have a script that can tell if the current source code is good or bad) which will automate the whole process of compiling, testing, and marking the commit as good/bad!

```
# git bisect run <cmd> ...
$ git bisect run node bisect/index.js
```

> N.B. The script should exit with code 0 if the current source code is good/old, and exit with a code between 1 and 127 (inclusive), except 125, if the current source code is bad/new.

To know more about this feature please follow the reference section

## Reference
- https://git-scm.com/docs/git-bisect