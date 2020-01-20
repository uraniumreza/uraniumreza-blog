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

1. Round Robin – Requests are distributed across the group of servers sequentially.
2. Least Connections – A new request is sent to the server with the fewest current connections to clients. The relative computing capacity of each server is factored into determining which one has the least connections.
3. IP Hash – The IP address of the client is used to determine which server receives the request.

We can choose any of the load balancing methods depends on our needs. Different load balancing algorithms provide different benefits.

## Sticky Session

Information about a user’s session is often stored locally in the browser. For example, in a shopping cart application, the items in a user’s cart might be stored at the browser level until the user is ready to purchase them. Changing which server receives requests from that client in the middle of the shopping session can cause performance issues or outright transaction failure. In such cases, it is essential that all requests from a client are sent to the same server for the duration of the session. This is known as session persistence/sticky session.

Another use case for session persistence is when an upstream server stores information requested by a user in its cache to boost performance. Switching servers would cause that information to be fetched for the second time, creating performance inefficiencies.

That said, sticky sessions also make it more difficult to keep servers in balance. A server can become overloaded if it accumulates too many sessions, or if specific sticky sessions require a high number of resources. This could result in our load balancer having to shift a client to a different server mid-session, resulting in data inconsistency.

### Session Persistence using Cookies
There are two types of cookie-based session persistence: duration-based and application-controlled.

1. Duration-based session persistence: Our load balancer issues a cookie that defines a specific timeframe for session stickiness. Each time the load balancer receives a client request, it checks whether this cookie is present. After the specified duration elapses and the cookie expires, the session is not sticky anymore.

2. Application-controlled session persistence: Our application generates a cookie that determines the duration of session stickiness. The load balancer still issues its own session cookie on top of it, but it now follows the lifetime of the application cookie. This makes sticky sessions more efficient, ensuring that users are never routed to a server after their local session cookie has already expired. However, it’s more complex to implement because it requires additional integration between the load balancer and the application.

## Dynamic List of Servers
Many fast‑changing applications require new servers to be added or taken down on a constant basis. This is common in environments such as the Amazon Web Services (AWS) Elastic Compute Cloud (EC2), which enables users to pay only for the computing capacity they actually use, while at the same time ensuring that capacity scales up in response traffic spikes. In such environments, it greatly helps if the load balancer can dynamically add or remove servers from the group without interrupting existing connections.