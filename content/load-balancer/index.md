---
title: 'Load Balancer'
description: 'Suppose we have got a list of server instances that serves our client requests and the Load balancer efficiently distributes incoming network requests across those server instances.'
date: '2020-01-21'
categories:
 - Software Development
 - Scalability
 - System Design
published: true
---

## What is a Load Balancer

Suppose we have got a list of server instances that serves our client requests and the Load balancer efficiently distributes incoming network requests across those server instances.

If a single server goes down, the load balancer redirects traffic to the remaining online servers. When a new server is added to the server group, the load balancer automatically starts to send requests to it. A load balancer performs the following functions:

- Distributes client requests or network load efficiently across multiple servers
- Ensures high availability and reliability by sending requests only to servers that are online
- Provides the flexibility to add or subtract servers as demand dictates

## Load Balancing Algorithms

There are different load balancing algorithms; such as -

1) Round Robin – Requests are distributed across the group of servers sequentially.
2) Least Connections – A new request is sent to the server with the fewest current connections to clients. The relative computing capacity of each server is factored into determining which one has the least connections.
3) IP Hash – The IP address of the client is used to determine which server receives the request.

We can choose any of the load balancing methods depends on our needs. Different load balancing algorithms provide different benefits.

## Sticky Session

Information about a user’s session is often stored locally in the browser. For example, in a shopping cart application, the items in a user’s cart might be stored at the browser level until the user is ready to purchase them. Changing which server receives requests from that client in the middle of the shopping session can cause performance issues or outright transaction failure. In such cases, it is essential that all requests from a client are sent to the same server for the duration of the session. This is known as session persistence/sticky session.

Another use case for session persistence is when an upstream server stores information requested by a user in its cache to boost performance. Switching servers would cause that information to be fetched for the second time, creating performance inefficiencies.

## Dynamic List of Servers
Many fast‑changing applications require new servers to be added or taken down on a constant basis. This is common in environments such as the Amazon Web Services (AWS) Elastic Compute Cloud (EC2), which enables users to pay only for the computing capacity they actually use, while at the same time ensuring that capacity scales up in response traffic spikes. In such environments, it greatly helps if the load balancer can dynamically add or remove servers from the group without interrupting existing connections.