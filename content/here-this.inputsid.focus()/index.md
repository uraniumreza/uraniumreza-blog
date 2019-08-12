---
title: "Here, this.inputs[id].focus();"
description: "focusNextField(id) { \n this.inputs[id].wrappedInstance.focus();\n}"
date: "2017-12-21T04:45:12.718Z"
categories: []
published: true
canonical_link: https://medium.com/@uraniumreza/now-this-inputs-id-focus-ab22be8caa45
redirect_from:
  - /now-this-inputs-id-focus-ab22be8caa45
---

Here, **_this.inputs\[id\].focus();_** returns an error saying that .focus is a undefined function! Then I figure out a solution by console logging **_this.inputs\[id\]_** and found that focus() is under ‘**_wrappedInstance_**’. So I had to re-write the function to solve this;

> focusNextField(id) {   
>  this.inputs\[id\].wrappedInstance.focus();  
> }
