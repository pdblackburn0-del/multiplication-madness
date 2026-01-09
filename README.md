README

### Purpose
We built a website for children to help practice their multiplication skills in a quiz that replicates the government maths test (but just more fun!).


### Target Audience
Our target audience is children aged 5-11. Multiplication tables are extremely important in UK schools with a big emphasis in Year 4, where a government check is carried out on all UK pupils in Year 4 to complete 25 random questions. The pass mark is 25/25. 


## User Goal
The user goal is for children to be able to practice their maths, and have fun doing so.
To produce an interactive, fully responsive game. It also needed to be simple to use; most specifically our users of Primary School age.


## Key Features
Instructions for game.
Randomised multiplication questions.
Countdown timer.
Progress bar.
Score.
Interactive website buttons & keyboard functionality.


## Design
We used google fonts to select a child friendly, fun and legible font: ‘Playpen Sans’ . We used this font for everything on the page. We manipulated the size of various sections through div classes and CSS. 


## Planning/Wireframe

Large screens:
![PC Wireframe](/assets/images/pc-wireframe.png)


Small screens and mobile devices:
![Mobile Wireframe](/assets/images/mobile-wireframe.png)


## Main Features

The main design consisted of Main page and two modal pop ups, one with the instructions and one with the results

Welcome menu- easy, responsive buttons aimed.
![Welcome menu](/assets/images/madness-welcome-menu.png)


Instruction modal- combined pictures and easy to read instructions.
![Instructions](/assets/images/madness-instructions.png)

Main game page- simple design, targeted to users of Primary School age.
![Main Game](/assets/images/madness-game.png)


Result modal pop up.
![Results Modal](/assets/images/madness-result.png)

-Media queries:
The background design has a media query so that on smaller screens it changed to a portrait version of the same image. We used multiple media queries on the font sizes and divs so that the game shrinks to fit on smaller screens. 
/*background image for tablets and mobiles*/
@media (max-width: 992px) {
   body {
       background-image: url(../images/mobile-background.png);
       background-size: cover;
       background-repeat: no-repeat;
       height: 100%;
   }
}




We also used media queries to shrink font sizes and buttons smaller devices: 
/* Extra small devices */
@media (max-width: 360px) {
   .page-title {
       font-size: 20px;
       margin: 10px 5px;
   }
  
   .page-sub-title {
       font-size: 12px;
   }
  
   #game button {
       height: 45px;
       width: 45px;
   }
}


Additionally we discovered the use of  ‘clamp()’ and its benefits as media queries limited the end result. This helps to avoid having to write multiple breakpoints; to ensure a truly responsive UI without writing dozens of media queries. It is perfect for games and creates smooth scaling across all screen sizes for all components in the game. Clamp uses a ‘min-value’, ‘fluid-value’ and ‘max value’ saving the need for 3 media queries. 


## Colors
We used AI to produce a background image and extracted the main colours from this using a colour picker to produce our root colours: 

:root {


   --font-primary: 'Playpen Sans', sans-serif;
   --key-lime-pie: #b8d630;
   --color-tertiary: #f9d830;
   --sail: #aadef8;
   --punch: #da4529;
   --fern-green: #447f3b;
   --sprout: #b1cc9b;
   --color-secondary: #a355c0;
   --color-primary: #330a4c;
   --color-grass: #5BA134;
}

We used color-secondary and a bold color-primary for header 1 and header 2 so that they stood out and were visible from the sky background. We maintained the theme colors through the modals and calculator functions so that they synced nicely with the page. 


## Languages/Libraries Used
HTML
CSS
JavaScript
Bootstrap


## Accessibility & UX
Included all the necessary accessibility options for screen readers (e.g. aria-labels, alt-text), and made sure that all of the text and buttons on the webpage were easily visible.


## Validation & Testing
Responsiveness testing.

HTML Validation:
![HTML Validation](/assets/images/HTML-validation.png)



CSS Validation:
![CSS Validation](/assets/images/CSS-validation.png)


Tested using Chrome Dev Tools during development and using Am I Responsihttps://ui.dev/amiresponsiveve? 
![Website Responsiveness](/assets/images/Website-responsiveness.png)


## Deployment
Deployed on GitHub pages.
Deployed link: https://pdblackburn0-del.github.io/multiplication-madness/ 


## Use of AI in Development (LO5)
Use of AI in developing the project consisted of;
Image creation for background,
Bug fixes
Support with generating JavaScript for game functionality and helping to explain some script.


## Challenges
This was our first collaborative project for all involved. Most challenges arose when learning to use Git commands, commits, pull requests and resolving merge conflicts. We worked together to resolve issues and worked using pair programming. Out Paired/ Group calls were extremely valuable for idea generation and avoiding extra merge conflicts.
Other challenges faced were around media queries in the code. This was solved using “clamp” which is explained further in our Media queries section.


## Future Development
Further development could be made in the game, by creating a login for children and to also log their data. Data Analytics could be used to graph the child’s progress and record which times tables they still need to practice. 


## Author
This site was built by Pete, Aimee, Tolase, and Rory.



