---
title: "Understanding Browser Frame"
description: "What is a Frame?"
date: "2019-08-12T05:50:19.932Z"
categories: []
published: false
---

### What is a Frame?

A frame represents very low level browser events which the browser had to execute and handle in order to draw our webpage to the screen. Once a webpage is on the screen, then it’s done; no more frames are needed. However, any sort of modifications or any different kind of activity going on e.g. if we’re scrolling the page, adding elements to the page or doing animations; these will equate to some sort of new frames containing a bunch of browser events.

In a short, frames contain different kind of browser events to be processed. Generally, frames with a lot of activities will take longer than frames with limited number of activities. For measuring performance we’ll use FPS (Frames Per Second) for each frame to load. Most browser events in a frame are handled synchronously i.e. one frame must be completed before the next one begins.

### Why should we know about frame?

First of all, it contains data that we can use for performance debugging. Understanding performance debugging in detail is very useful because the better we understand performance, we can put the best experience from an user perspective. When a frame takes too long period of time, it will definitely be noticeable to the user. Finally, if we want to understand the performance panel a bit more then frame is the fundamental concept of that.

### A frame in DevTools
