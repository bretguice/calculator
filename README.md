https://bretguice.github.io/calculator/

I made a calculator using HTML/CSS and JavaScript for The Odin Project.

First I set the core HTML structure for the page.
Next I added the CSS to design the look of my calculator.  I focused on making the calculator look as realistic as possible.  Various shades of gray and a green screen that appears to glow were important parts to me for the look.
I picked a grid layout because that made the most sense in terms of keeping all buttons lined up.
Also I added a digital style font to match the look.

My first hurdle on the JavaScript side was figuring out how to have each button press adding the number to the value.  I opted to treat the display as a string to make things easier to add to the end.

I iterate to add an event listener to each button to listen for the click.  Various functions were created to determine the core functionality of the calculator.  I created  seperate operator and special operator classes to allow me to focus on if the math requires a single number or two numbers for the calculation. 

I added functionality to backspace, clear the entry, or clear all data on the calcualtor.  Initially I had all this functionality set into just one function.  After adding keypad listeners I had to create individual functions for each of these to dictate which action should be taken from each key.

Keypad functionality was my last step.  I set up an event listener on the window to determine the key used and take action.  One last function to check which keycode was used to filter which function is called from each key.
