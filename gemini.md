Create a chrome extension that will work on the domain: https://www.makemytrip.com/
The purpose of the chrome extension is to hide unwanted elements on the site. 

Create functions that can hide elements given different information like id, a class or multiple classes, tags, xpath, or other similar information. 

Title for the extension: Simple MakeMyTrip

--

You are an expert at creating Chrome extensions. The extension must follow modern Chrome extension best practices. Generate the content for each of the following files based on the detailed instructions below.

1. File: manifest.json
Create the manifest file using Manifest V3.

"manifest_version": Must be 3.

"name": Set to "[Your Extension Name]".

"version": Start with "1.0".

"description": Write a clear, one-sentence description of the extension's purpose.

"permissions": Only include the minimum permissions required. Start with ["storage", "activeTab", "scripting"]. Add other permissions only if essential for the core functionality.

"action": Configure the browser action to use popup.html as the default popup and define 16, 48, and 128px icons located in an images/ directory.

"background": Specify a service worker pointing to background.js.

"content_scripts": If needed, set this up to inject content.js. For the "matches" property, be as specific as possible (e.g., "*://*.example.com/*"). Avoid using "<all_urls>" unless absolutely necessary.

"icons": Define the 16, 48, and 128px icons, pointing to the images/ directory.

2. File: popup.html
Create the HTML for the popup window.

The HTML must be well-structured and semantic.

It must link to popup.css for styling and popup.js for logic.

Crucially, do not use any inline JavaScript (e.g., onclick="..."). All event handling must be done in popup.js.

3. File: popup.css
Create a clean, simple, and modern CSS file to style the popup. The styles should ensure the popup is readable and easy to use.

4. File: popup.js
Create the JavaScript for the popup window.

Wrap all code within a document.addEventListener('DOMContentLoaded', function() { ... }); block to ensure the script runs only after the popup's HTML has fully loaded.

Use document.getElementById() or document.querySelector() to reference HTML elements.

Use .addEventListener('click', ...) to handle user interactions.

To execute code on the active web page, use the chrome.scripting.executeScript() method.

To communicate with the background script, use chrome.runtime.sendMessage().

5. File: background.js
Create the background service worker script.

The script must be event-driven. Do not use global variables to store state, as the service worker can be terminated at any time.

Use the chrome.runtime.onInstalled listener to perform one-time setup tasks, such as initializing default values in chrome.storage.sync or chrome.storage.local.

Use chrome.runtime.onMessage to listen for and respond to messages from other parts of the extension (like the popup or content scripts).

All persistent state must be saved using the chrome.storage API.

6. File: content.js
Create the content script that will be injected into web pages.

Wrap the entire script in an Immediately Invoked Function Expression (IIFE) (() => { ... })(); to prevent its variables and functions from conflicting with the host page's JavaScript environment.

When interacting with the page's DOM, always check that an element exists before attempting to read from or modify it.

Use chrome.runtime.sendMessage() to send data from the page back to the background script.

7. File: README.md
Create a basic README.md file that includes:

The extension's name.

A brief description of what it does.

A list of the included files.

Simple, step-by-step instructions on how to load the extension in Chrome in Developer Mode ("Load unpacked").

8. Directory: images
Create an empty directory named images. Add a note that placeholder icons (icon16.png, icon48.png, icon128.png) need to be added to this directory.
