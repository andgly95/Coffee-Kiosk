Front End React Project

This folder contains the project folder "baca-coffee" which holds all of the project files for the front-end
To start, cd into the baca-coffee directory and run "npm install" followed by "npm start".

This project was created using Create-React-App to generate all of the boilerplate files.

All of the important source code is in the 'src' folder of the 'baca-coffee' directory.

App.js is the starting point for the app, and contains the state for all of the components.
The /components folder contains the rest of the components for the app.

/src/App.js
*State
-options
	The options object contains three array that hold the data for each option that the user can select.
	Each array holds the options for each type (drink, bean, milk), along with the name, status, and id of each choice with a link to the
	appropriate image.
-selection
	The selection object contains the current drink that has been selected, storing the drink, bean and milk option, or "select" if one hasn't been selected
*Methods
-changeDrink
-changeMilk
-changeBean
	Each of these methods takes in the option ID as a parameter, and updates the state  based on the selection

-openPayment
	Once the user has selected their drink, bean and milk (if applicable), the Submit button opens up a modal with the user's selection, and prompts them to enter their name for the order.

-submitOrder
	Once the user has entered their name, they can click Submit, which sends a request  to the order server to make the specified drink.

*Render
-CoffeeSelector
-ConstructedDrink
-Confirm

/src/components/drinkSelector.js
The DrinkSelector component receives the drink options array and maps each option onto an ItemSelection component, which renders
each button. The map is stored in the drinkButtons variable and is rendered in the return method.
./beanSelector.js
./milkSelector.js
Similar implementation, with more specifics for options

/src/components/itemSelection.js
The ItemSelection component receives the option mapped by the selector, and returns a clickable div with the image of the option, depending on the status of the item and order.

/src/components/constructedDrink.js
The ConstructedDrink component receives the selection object, and displays the deconstructed drink in the center of the screen.
The text below the image prompts the user to select their drink, bean and milk options, and allows the user to submit only after choosing all required options

Style 
All of the styling is stored in /src/App.css
The layout is kept using Flexbox for some of the various containers
As of this point, the view is fixed to a 1080x1920 vertical resolution for the touchscreen kiosk and many elements have fixed positions.

This readme hasn't been updated in a while, I've only just made some changes because many of the originally referenced components have been replaced or modified

