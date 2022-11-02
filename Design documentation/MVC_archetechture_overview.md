### Model
---

Dictates how a game should be solved. What shows up in the solution data is how this game will end up being solved
Dictates the initial state of the board and queue
Dictates the state of the games from the user whether they are solved or not.
Manages the state of the board and pieces inside the Tetris game

### View 
---
Displays the state of each game and what strategies are available to
Displays the Tetris wiki elements
Displays the user the current state of the board and what pieces exist inside the Tetris game
Displays what games the user can see. Depending on their level they will not get access to all the games

### Controller
---
Each update to the state of the React app will act as a controller implicitly on the front end
Updates the model via an api call when a user completes a game