

# TicTacToe - Milestone Project 2
_A website dedicated to showing the finest baked goods in North Wales, as part of  a Level 5 Diploma in Web Application Development_

*Disclaimer: This project will borrow heavily from the real life bakery business by the same name, run by my sister, but will not seek to replace any existing business page, nor will it make any guarantees of factual accuracy with regards to ingredients, dietary requirements, or calorie content.*

This website, Totally Baked Cake Co, is an online presence for a family-run home-bakery based in Flintshire, North Wales. The aims of this website are to provide a landing point for sales leads and interest generated both online and in person. Having a mobile friendly design layout means that people could be directed to the website during an in-person meeting and left to explore more options.

![A gif displaying the Totally Baked Cake Co website on a variety of different devices and screen-sizes](<README assets/responsive_screens.gif>)

## Contents
- [Totally Baked Cake Co.](#totally-baked-cake-co)
- [User Stories](#user-stories)
  - [As a user...](#as-a-user)
- [Design Considerations](#design-considerations)
  - [Creating a wireframe](#creating-a-wireframe)
  - [Once building was underway](#once-building-was-underway)
- [Code Sources](#code-sources)
  - [Mozilla Developer Network Documentation](#mozilla-developer-network-documentation)
    - [Aspect Ratio and Object Fit](#aspect-ratio-and-object-fit)
  - [Bootstrap Documentation](#bootstap-documentation)
    - [Modals](#modals)
  - [Adding JavaScript](#adding-javascript)
    - [Dynamic Logo and Nav](#dynamic-logo-and-nav)
    - [User Feedback in Form Confirmation](#user-feedback-in-form-confirmation)
  - [Favicon](#favicon)
- [Features](#features)
- [Lighthouse Reports & Validation](#lighthouse-reports--validation)
  - [Performance](#performance)
  - [Accessibility](#accessibility)
  - [Code Validation](#code-validation)
- [Testing](#testing)
  - [Testing User Stories](#testing-user-stories)
  - [Additional testing](#additional-testing)
  - [Functional Testing](#functional-testing)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Images](#images)

## User Stories
### As a user...
* I want to understand the purpose of the page when it loads
* I want to browse a thumbnail gallery of cakes so that I can visually explore the type of products provided
* I want to be able to see larger versions of the thumbnails
* I want to be able to see a description of each of the cakes on offer
* I want to know about specific dietary concerns (Gluten/Wheat, Dairy, Egg, etc)
* I should be able to submit an enquiry
* I should be able to find out more information about the origins of the bakery
* I should be able to find out where the bakery is based

## Design Considerations
### Creating a wireframe

* Colours
  * The colours for this project are primarily <span style="background-color: rgb(152, 186, 185); color: black;"><strong>rgb(152, 186, 185)</strong></span> and <span style="background-color: rgb(215, 194, 213); color: black;"><strong>rgb(215, 194, 213)</strong></span>, combining with a simple white, often semi-transparent in order to use some of the background image to add a little bit of texture to the background.

When Designing the website for Totally Baked Cake Co, I knew that the real heroes of the design would be the cakes themselves, so a gallery was the obvious way to go. I wanted to make sure that the gallery would display correctly across a variety of devices, so when I was working on the wireframe I made sure to plan for desktop, tablet, and mobile views.

The basic principle was that the images would have a 1:1 aspect ratio in order to more easily accomodate portrait and landscape source images. The images could then be displayed in a grid where the screen width determines how many images go on each row.

![Wireframe](<README assets/wireframe.png>)

You can download and view the wireframe [here](<README assets/totally_baked_wireframe.bmpr>) (you will need your own version of Balsamic Wireframes or another program that can open .bmpr files)

### Once building was underway
I initially had an idea of having the logo and navigation form a hero image, and using an onScroll property of the window to resize or transform that to take he place of a more typical logo in a header similar to that which would typically be found in most modern web applications. This turned out to be far too unreliable, and was ultimately scrapped. (Read more in [Adding JavaScript](#adding-javascript))

## Code Sources
### Mozilla Developer Network Documentation
#### Aspect Ratio and Object Fit
In order to make perfectly square images, but maintain the reactiveness of the site across different screen sizes, I've used a width property of 100% to fill the column, and then found an `aspect-ratio` rule that I can give a 1/1 ratio.
https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio

The next step was to make the images hold their proportions, and simply hide their irregular shapes and resolutions, using `object-fit: cover`

### Bootstrap Documentation
#### Modals
I took the example Static Backdrop modal and stripped a few things out out - I think this was intended for user-prompts but I'll be using it for simply displaying more information about the clicked-image.

I'd managed to get mixed up between versions of bootstrap - the attribute to dismiss a modal in certain versions Bootstrap is data-bs-dismiss="modal", but data-dismiss="modal" is the correct one for the version I'm using. That'll teach me to lift code out of the example in the documentation!

### Adding JavaScript
#### Dynamic Logo and Nav
The desktop version of Totally Baked Cake Co features a landing page with an oversized logo and navigation menu, that I wanted to shrink to a more typical size into the top-left of the screen once the user has begun to scroll.

In order to do this I needed to first link `.js` file, and make use of the `document.getElementById()` function in JavaScript. I then need to add a class name to the element(s).

Two good examples that helped:
* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
* [W3Schools](https://www.w3schools.com/howto/howto_js_add_class.asp)

I also need to tie into the "scroll" event with an event listener found in this example in the MDN docs [window.scrollY](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY)

After trying my best to make this work for a long time, I decided in [this commit](https://github.com/mikesealey/ci_pp1/commit/d28be2d0ecbbe74212eb0097d7a4c6ed91451685) that the effort was not worth the reward. Although I had envisioned something more dynamic, two different approaches both returned unacceptable results.

#### User Feedback in Form Confirmation
When adding in a form and confirmation page I did manage to use a little bit of JavaScript though - I noticed that all of the values submitted in contact.html were available as URL parameters in confirmation.html. [This post](https://sentry.io/answers/how-to-get-values-from-urls-in-javascript/) gave a very quick insight, and with some tinkering I was able to bring the parameters in, assign them to variables, and set them as the text in elements using document.getElementByID.

<img src="README assets/query_screenshot.png" style="max-width: 50%;">

## Favicon
It's always a nice touch to have a favicon, instead of the browser's default icon.
![Example of the default favicon](<README assets/default_favicon.png>)

I knew that it could be switched fairly easily, but I wasn't sure on the specifics. Luckily I found [this entry](https://www.w3schools.com/html/html_favicon.asp) on W3Schools that helped.
![Improved favicon, now including the Totally Baked Cake Co logo](<README assets/better_favicon.png>)

## Features
  - On all pages the user is met with an oversized logo, website title, and navigation. The navigation link for the page that is currently on display is emboldened to denote that the user is currently there.
  - The homepage features a large image gallery showcasing some of the finest sweet-treats that Totally Baked Cake Co has to offer
  - Each image in the gallery is clickable, and opens a modal containing a larger version of the image, a description, and some dietary specifications about the cake.
  <img src="./README assets/modal_example.png" alt="example of the modal">
  - The _About Us_ page explains the origins of the bakery, giving an authentic, home-bakery vibe.
  - The _Contact_ page gives users the opportunity to get in touch for more information, or enquiry about commissioning a cake
  <img src="./README assets/contact_example.png" alt="contact form">
  - When a user successfully submits a contact-form they are directed towards `confirmation.html`, which pulls in the URL parameters and shows the values of the enquiry submitted.
  <img src="./README assets/contact_confirmation_example.png" alt="an example of the confirmation shown when a form is successfully submitted.">

## Lighthouse Reports & Validation
### Performance
The main attraction of this website is the cakes themselves, and so it makes sense to have lots of pictures of them. However, in an early iteration I realised that I had 20 JPEGs all averaging 4MB each, and so the opening performance was _terrible_.

I fed all of my images through [tinyPNG.com](https://www.tinypng.com) and managed to significantly reduce the overall load-time and the filesizes that needed to be downloaded.
![Showing the savings TinyPNG have helped me make](<README assets/totally_baked_tinypng_savings.png>)

### Accessibility
I took some time to add Aria labels to footer links that otherwise only contain icons, which improved the accessibility score greatly.

<figure style="border: 2px solid rgba(0,0,0,0.5); padding: 12px;">
  <div>
    <img src="./README assets/lighthouse_index.png" style="max-width: 49%">
    <img src="./README assets/lighthouse_about.png" style="max-width: 50%">
  </div>a
  <div>
    <img src="./README assets/lighthouse_contact.png" style="max-width: 33%">
    <img src="./README assets/lighthouse_confirmation.png" style="max-width: 33%">
    <img src="./README assets/lighthouse_404.png" style="max-width: 33%">
  </div>
  <figcaption><em>Lighthouse for all 5 HTML pages </em></figcaption>
</figure>


I also found that my website title doesn't have adequate contrast using [https://wave.webaim.org/](https://wave.webaim.org/)
 
<img src="./README assets/Contrast Validation.png" style="max-width: 350px">

A quick update later, and I can see that I now pass.

<img src="./README assets/wave_index.png" style="max-height: 450px">
<img src="./README assets/wave_about.png" style="max-height: 450px">
<img src="./README assets/wave_contact.png" style="max-height: 450px">
<img src="./README assets/wave_confirmation.png" style="max-height: 450px">
<img src="./README assets/wave_404.png" style="max-height: 450px">

### Code Validation
I passed each of my 5 HTML files through [w3.org](https://validator.w3.org/nu/)'s HTML validator, and tackled each of the issues raised. I then passed my JavaScript file through [https://jshint.com/](https://jshint.com/) in order to ensure that the code was inline with standards. The information returned was warning me that using `const` is only available with ES6, and will incompatible with older browsers like Internet Explorer.  [Read more here](https://www.w3schools.com/js/js_es6.asp#mark_const)

<figure style="border: 2px solid rgba(0,0,0,0.5); padding: 12px;">
  <div>
    <img src="./README assets/Index Validation.png" style="max-width: 33%">
    <img src="./README assets/About validation.png" style="max-width: 33%">
    <img src="./README assets/Contact Validation.png" style="max-width: 33%">
  </div>
  <div>
    <img src="./README assets/Confirmation Validation.png" style="max-width: 49%;">
    <img src="./README assets/404 Validation.png" style="max-width: 49%;">
    <img src="./README assets/JS Validation.png" style="max-width: 49%;">
    <img src="./README assets/w3c css validation.png" style="max-width: 49%;">
  </div>
  <figcaption><em>Validation for all 5 HTML pages, script.js and validation for style.css </em></figcaption>
</figure>


### A note about HTML Validation
Interestingly, when using the more semantic `<section>` tag, the validation tool put up a warning - it seems that sections prefer to have `<h2>` - `<h6>` subheadings, and in this case in order to wrap the gallery it made more sense to the validation tool to use the catch-all `<div>` tag for the gallery.

<img src="./README assets/semantic_html.png" alt="HTML Validation warning about using section tags" style="width: 50%;">

### A note about the JS Validation
The JS Validation tool identifies and warns about the use of `const` - this seems to be for compatibility with older browsers. [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const#browser_compatibility) lists it's compatibility with _all_ major modern browsers. [W3schools](https://www.w3schools.com/js/js_versions.asp) discusses the keyword `const` being added in 2015, and [here](https://www.w3schools.com/js/js_versions.asp#:~:text=Browser%20Support%20for%20ES6%20(2015)&text=Internet%20Explorer%20does%20not%20support%20ECMAScript%202015.) states that Internet Explorer is not compatable with ECMA6. This all boils down to say that this project (or likely just the confirmation page) is not compatible with Internet Explorer.

## Testing
### Testing User Stories
* I want to understand the purpose of the page when it loads
  - `index.html` On page load I am greeted with an introductory paragraph welcoming the user, and inviting them to explore more of the website
  
 ![Helping users understand the page](<README assets/understand_page.png>) 

* I want to browse a thumbnail gallery of cakes so that I can visually explore the type of products provided
  - `index.html` contains a gallery of 20 images that _Totally Baked_ have made.

![thumbnail gallery](<README assets/thumbnail_gallery.png>)

* I want to be able to see larger versions of the thumbnails
* I want to be able to see a description of each of the cakes on offer
* I want to know about specific dietary concerns (Gluten/Wheat, Dairy, Egg, etc)
  - Each of the images in the gallery of `index.html` can be clicked to view in a modal, including a detailed description and dietary specifications.

![example of modal](<README assets/modal_example.png>)

* I should be able to submit an enquiry
  - `contact.html` contains a contact form that allows the user to get in touch with an enquiry. Completing the form navigates to `confirmation.html` that shows the user the enquiry they have just submitted for peace of mind and positive confirmation.

  ![Contact form example](<README assets/contact_example.png>)

* I should be able to find out more information about the origins of the bakery
* I should be able to find out where the bakery is based
  - `about.html`

![screenshot of the about page](<README assets/about_screenshot.png>)

### Additional testing
* I have tried submitting the contact form with the following
  - 3 completed fields, and one empty field
  - 2 completed fields and 2 empty fields
  - 1 completed field and 3 empty fields.
  - All fields completed, but no email address provided in the email field.
  - User testing identified the need for `maxlength` properties on text input fields

### Functional Testing

| Action | Expected Outcome | Pass/Fail |
| ----- | ----- | ----- |
| <h4>_From Standard Pages_</h4> |  |  |
| Clicking the link to the website | User should land on the homepage | Pass |
| Clicking the link in the navigation bar from Home to About  | User should be directed to About | pass |
| Clicking the link in the navigation bar from Home to Contact  | User should be directed to Contact | pass |
| Clicking the link in the navigation bar from About to Home  | User should be directed to Home | pass |
| Clicking the link in the navigation bar from About to Contact  | User should be directed to Contact | pass |
| Clicking the link in the navigation bar from Contact to Home  | User should be directed to Home | pass |
| Clicking the link in the navigation bar from Contact to About  | User should be directed to About | pass |
| <h4>_From non-standard pages_</h4> |  |  |
| Clicking the link in the navigation bar from Confirmation to Home  | User should be directed to Home | pass |
| Clicking the link in the navigation bar from Confirmation to About  | User should be directed to About | pass |
| Clicking the link in the navigation bar from Confirmation to Contact  | User should be directed to Contact | pass |
| Clicking the link in the navigation bar from 404 to Home  | User should be directed to Home | pass |
| Clicking the link in the navigation bar from 404 to About  | User should be directed to About | pass |
| Clicking the link in the navigation bar from 404 to Contact  | User should be directed to Contact | pass |
| <h4>_From Home in footer_</h4> | ----- | ----- |
| Clicking facebook icon | Should open facebook in a new tab | pass |
| Clicking instagram icon | Should open instagram in a new tab | pass |
| Clicking X (twitter) icon | Should open X (twitter) in a new tab | pass |
| Clicking Youtube icon | Should open Youtube in a new tab | pass |
| Clicking LinkedIn icon | Should open LinkedIn in a new tab | pass |
| Clicking Etsy icon | Should open Etsy in a new tab | pass |
| <h4>_From About in footer_</h4> | ----- | ----- |
| Clicking facebook icon | Should open facebook in a new tab | pass |
| Clicking instagram icon | Should open instagram in a new tab | pass |
| Clicking X (twitter) icon | Should open X (twitter) in a new tab | pass |
| Clicking Youtube icon | Should open Youtube in a new tab | pass |
| Clicking LinkedIn icon | Should open LinkedIn in a new tab | pass |
| Clicking Etsy icon | Should open Etsy in a new tab | pass |
| <h4>_From Contact in footer_</h4> | ----- | ----- |
| Clicking facebook icon | Should open facebook in a new tab | pass |
| Clicking instagram icon | Should open instagram in a new tab | pass |
| Clicking X (twitter) icon | Should open X (twitter) in a new tab | pass |
| Clicking Youtube icon | Should open Youtube in a new tab | pass |
| Clicking LinkedIn icon | Should open LinkedIn in a new tab | pass |
| Clicking Etsy icon | Should open Etsy in a new tab | pass |
| <h4>_From Confirmation in footer_</h4> | ----- | ----- |
| Clicking facebook icon | Should open facebook in a new tab | pass |
| Clicking instagram icon | Should open instagram in a new tab | pass |
| Clicking X (twitter) icon | Should open X (twitter) in a new tab | pass |
| Clicking Youtube icon | Should open Youtube in a new tab | pass |
| Clicking LinkedIn icon | Should open LinkedIn in a new tab | pass |
| Clicking Etsy icon | Should open Etsy in a new tab | pass |
| <h4>_From 404 in footer_</h4> | ----- | ----- |
| Clicking facebook icon | Should open facebook in a new tab | pass |
| Clicking instagram icon | Should open instagram in a new tab | pass |
| Clicking X (twitter) icon | Should open X (twitter) in a new tab | pass |
| Clicking Youtube icon | Should open Youtube in a new tab | pass |
| Clicking LinkedIn icon | Should open LinkedIn in a new tab | pass |
| Clicking Etsy icon | Should open Etsy in a new tab | pass |
| <h4>_Modals in the gallery_</h4>  | ----- | ----- |
| Clicking Picture of Thick Cut Chocolate Brownie | Should open Thick Cut Chocolate Brownie modal | pass |
| Clicking Picture of Christmas Wreath Merengue | Should open Christmas Wreath Merengue modal | pass |
| Clicking Picture of Chocolate Orange Cake | Should open Chocolate Orange Cake modal | pass |
| Clicking Picture of Strawberry and White Chocolate Cake | Should open Strawberry and White Chocolate Cake modal | pass |
| Clicking Picture of Sparkly Blue Birthday Cake | Should open Sparkly Blue Birthday Cake modal | pass |
| Clicking Picture of Pink and White Butterfly Birthday Cake | Should open Pink and White Butterfly Birthday Cake modal | pass |
| Clicking Picture of Raspberry Cheesecake | Should open Raspberry Cheesecake modal | pass |
| Clicking Picture of Kinder Bueno Cheesecake | Should open Kinder Bueno Cheesecake modal | pass |
| Clicking Picture of Happy Hippo Cheesecake | Should open Happy Hippo Cheesecake modal | pass |
| Clicking Picture of Australia-themed cupcakes | Should open Australia-themed cupcakes modal | pass |
| Clicking Picture of Double Chocolate Cake | Should open Double Chocolate Cake modal | pass |
| Clicking Picture of Rainbow Cake | Should open Rainbow Cake modal | pass |
| Clicking Picture of Pink and Purple Birthday Cake | Should open Pink and Purple Birthday Cake modal | pass |
| Clicking Picture of Kiss-themed Cake | Should open Kiss-themed Cake modal | pass |
| Clicking Picture of Chocolate Tower Cake | Should open Chocolate Tower Cake modal | pass |
| Clicking Picture of Pink Slices | Should open Pink Slices modal | pass |
| Clicking Picture of Tie Dye themed Cupcakes | Should open Tie Dye themed Cupcakes modal | pass |
| Clicking Picture of Carrot Cake | Should open Carrot Cake modal | pass |
| Clicking Picture of Rainbow Birthday Cake | Should open Rainbow Birthday Cake modal | pass |
| Clicking Picture of Peppa Pig Birthday Cake | Should open Peppa Pig Birthday Cake modal | pass |


### Browser Compatibility
As discussed in [a note about the JS Validation](#a-note-about-the-js-validation) this project is not compatible with Internet Explorer.

I have tested all of the above functionality across Opera, Edge, Chrome, and Firefox. (Left to right, top to bottom)
![Totally Baked Cake Co website open on Opera, Edge, Chrome, and Firefox](<README assets/browser_testing.png>)
![Totally Baked Cake Co contact form confirmation open on Opera, Edge, Chrome, and Firefox](<README assets/browser_testing2.png>)

## Deployment
This site has been deployed to Github Pages. The steps to deploy are as follows:
  - In the Github repository, navigate to the Settings tab
  - In the menu of the left under "Code and automation" visit "Pages"
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

## Cloning this repo
You may wish to clone this repo to work on it yourself
- At the top of the page above the file-list, click the "Code" button
- Copy the URL `https://github.com/mikesealey/ci_pp1.git`
- On the command line, navigate to where you want to clone this repository
- run the following command
    `git clone https://github.com/mikesealey/ci_pp1.git`

![Clone Repo screenshot from github](<README assets/clone_repo.png>)

## Forking this repo
You may also wish to fork this repo to develop it further for your own needs
- In the top bar, click "Fork"
- Choose the github account or organisation where you want to fork the repository
- Github will now create a copy (or _fork_) of the repository in your account.
![fork repo screenshot from gitub](<README assets/fork_repo.png>)

## Credits
### Images:
The site logo has been taken from [Totally Baked Cake Co's facebook page](https://www.facebook.com/thetotallybakedcakeco/).

The background image is a stock photo  that I found on [unsplash](https://unsplash.com/photos/white-snow-on-brown-soil-KMEqlxz3mKc), taken by [Nathan Dumlao](https://unsplash.com/@nate_dumlao).

All of the cakes features in this project were baked either by my sister Lizzie, or my wife Natalie.
| Cake | Baker |
| ------ | ------ |
| Thick Cut Chocolate Brownies | Lizzie |
| Christmas Menegue | Natalie |
| Chocolate Orange Cheesecake | Natalie |
| Strawberry & White Chocolate Cake | Natalie |
| Glittery Blue Birthday Cake            | Natalie |
| Pink and White Butterfly Birthday Cake | Natalie |
| Raspberry Cheesecake                   | Natalie |
| Kinder Bueno Cheesecake                | Natalie |
| Happy Hippo Cheesecake                 | Natalie |
| Australia-themed cupcakes              | Natalie |
| Double Chocolate Cake                  | Natalie |
| Rainbow Cake                           | Natalie |
| Pink and Purple Birthday Cake          | Natalie |
| Kiss-themed Cake                       | Natalie |
| Chocolate Tower Cake                   | Lizzie |
| Pink Slices                            | Lizzie |
| Tie Die themed Cupcakes                | Lizzie |
| Carrot Cake                            | Natalie |
| Rainbow Birthday Cake                  | Natalie |
| Peppa Pig Birthday Cake                | Natalie |

-----------------------------


# Notes for later -

Jest Parameterised tests are super cool - pass it an array of options and it will test all of them. My function takes more than one parameter, so they must be passed in as an arrays themselves.

Decided to try to be lazy and get ChatGPT to generate the parameters for some of the tests
![alt text](image.png)

prevent text selection when clicking tiles https://www.w3schools.com/howto/howto_css_disable_text_selection.asp

wewlcome function uses a .one function found here: https://api.jquery.com/one/

https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30 came in super useful

Custom Scrollbar https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_scrollbar