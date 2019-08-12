---
title: "Integrate facebook Account Kit with React"
description: "What the heck is actually facebook account kit?"
date: "2019-08-12T05:49:04.632Z"
categories: []
published: false
---

![Photo by [Jason Blackeye](https://unsplash.com/@jeisblack?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](./asset-1)

#### What the heck is actually facebook account kit?

_Account Kit_ is a product of Facebook that helps people quickly and easily register and log into your app using their phone number or email address which is referred as _passwordless credentials_. _Account Kit_ powered by Facebook’s email and SMS sending infrastructure for reliable, scalable performance with global reach. Because it uses email and phone number authentication, _Account Kit_ doesn’t require a Facebook account and is the ideal alternative to a social login. But if you develop your app for the web with the Facebook SDK for JavaScript, _Account Kit_ can use _Instant Verification_ for phone numbers. In this case, if people have a Facebook account containing the number they enter and is logged in to that account on the same browser, _Account Kit_ verifies the number directly without requiring them to manually enter an SMS code. It is relatively cheap as it supports up to 10,000 verification messages per month. After that, applications that exceed that will be charged at SMS standard rates.

#### How this passwordless authentication system work?

_Account Kit_ creates a database just for your app. You can access the data at any time through their _REST API_. As people log into your app, this database is populated with a list of phone numbers or email addresses and Account IDs that can be used within your app. These Account IDs are unique to your app. Account Kit has two login flows, depending on whether people choose phone number verification or email verification. Let’s just make our discussion topic concise and see how phone number verification flow works.

-   Call the _Account Kit_ API with a phone number to initiate a login or registration.
-   _Account Kit_ servers send an SMS with a confirmation code to continue the login. If users fail to receive the SMS code, Account Kit offers two other backups (Phone call and Facebook notification) that people can choose from.
-   The SDK verifies the SMS confirmation code.
-   If your app has enabled _Client Access Token Flow_, your app will receive an **_access token_** containing an account ID in response to a successful login. If your app has not enabled _Client Access Token Flow_, your client app will receive an **_authentication code_** that the application’s server may use to securely request an access token.

![_Account Kit workflow_](./asset-2.jpeg)

Enough of theory, let’s get our hands dirty on writing some codes and make the _Account Kit_ to talk to serve our web applications passwordless authentication system. First, you need to create an app from facebook developer [console](https://developers.facebook.com/apps/). You need to provide your _email address_ and a _display name_ for your app. Let’s name it — `AuthMe`. After creating the app you’ll be automatically redirected to the app dashboard. Now we have to update the app settings to add _Account Kit_ in our app. Click on _Products_ from the left menu of your application’s _Dashboard,_ click on _Set Up_ button for Account Kit. Select _WEB_ and then navigate to the _Settings_ menu for Account Kit. Select _Yes_ for _Require Server Validation? e_nabling this setting will require server-to-server calls for clients to receive _access tokens_. Also, the _app secret_ will be required for _Account Kit Graph API_ calls. But, you can update these settings at any time from the dashboard.

Now, lets create a react-app named as `react-fb-accountkit`;

```
npx create-react-app react-fb-accountkit
```
