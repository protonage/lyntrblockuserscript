// ==UserScript==
// @name         Lyntr user blocking
// @namespace    http://tampermonkey.net/
// @version      2024-08-06
// @description  blocks ppl on lyntr
// @author       @cum on lyntr
// @match        https://lyntr.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lyntr.com
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         Lyntr user blocking
// @namespace    http://tampermonkey.net/
// @version      2024-08-06
// @description  blocks ppl on lyntr
// @author       @cum on lyntr
// @match        https://lyntr.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lyntr.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

setTimeout(function(){    console.log('Lyntr user blocking script is running');
    // Initialize blocked usernames if not already set
    if (!window.targetUsernames) {
        window.targetUsernames = ["ggs", "pornhub", "brain", "-------", "pornogrophy", "hecurh"];
    }

    // Function to delete posts by usernames
    function deletePostsByUsernames(usernames) {
        const formattedUsernames = usernames.map(username => `@${username.toLowerCase()}`);

        // Select user elements
        const userElements = document.querySelectorAll("a.overflow-hidden.text-clip.rounded-sm.text-lg.text-muted-foreground.underline-offset-4.hover\\:underline.focus-visible\\:outline-2.focus-visible\\:outline-offset-8.focus-visible\\:outline-black");

        userElements.forEach(userElement => {
            const normalizedText = userElement.textContent.trim().toLowerCase();

            if (formattedUsernames.includes(normalizedText)) {
                const postContainer = userElement.closest("button.mb-2.w-full.text-left");
                if (postContainer) {
                    const nextDiv = postContainer.nextElementSibling;
                    console.log(`Removing post by user: ${normalizedText}`);
                    postContainer.remove();

                    if (nextDiv && nextDiv.matches("div.shrink-0.bg-border.h-\\[1px\\].w-full")) {
                        nextDiv.remove();
                    }
                }
            }
        });
    }

    // Initial delete on page load
    deletePostsByUsernames(window.targetUsernames);

    // Setup MutationObserver to monitor for new posts
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                deletePostsByUsernames(window.targetUsernames);
            }
        });
    });

    // Select the target node
    const targetNode = document.querySelector("div.flex.h-full.w-full.flex-col.gap-2.overflow-y-auto.px-1.py-2");
    const config = { childList: true, subtree: true };

    if (targetNode) {
        observer.observe(targetNode, config);
        console.log('MutationObserver is set up');
    } else {
        console.log('Target node not found');
    }
},5000)})();
