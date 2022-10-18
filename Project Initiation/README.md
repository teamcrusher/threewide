# Activity 1 - Project Idea Selection & Introduction Vlog

### Click the Image below to watch our VLOG 1
[![VLOG 1](https://user-images.githubusercontent.com/36246244/193962589-14f2e920-f1e2-4168-8a62-d56b6bb708da.png)](https://youtu.be/5LqXDVvpI1g)

## Outline

### Threewide
EDUCATIONAL TETRIS PLATFORM

### Project idea

An educational platform for Tetris strategies and techniques where members can interact with an embedded game. Catalog strategies or techniques with community feedback where members can share and gain knowledge through this platform and familiarize themselves with the game and prepare with proven knowledge of strategy at every level.

#### Primary Goal

To create an educational strategy platform with good interactivity

### Reasons
- To make a better Tetris community
- Allow more tetris players to master the game easier
- Sharing knowledge (Skills and techniques)
- Improve interactivity to enhance overall game experience
- User friendly interface
- Tetris is more than a game

### Impact

#### Current state

    Currently only forum based wikis such as hard drop and four.lol. The only project that exists that lets users practice strategies are twowi.de (which currently is down), jstris maps, zen mode in tetr.io, and fourtris. These are unorganized and difficult to link to strategies written in the wikis requiring expertise to use them properly.

#### Ideal state

    Allow players to practice their game effectively without installing some other tool. Beginners can learn with simple descriptions and let them practice, interacting with the concepts so they get an intuitive understanding

#### Action

    Develop and deploy a unified platform that contains all tetris knowledge with tools to practice it in one place

### Who

- Our audience: Tetris players
- Beginner player who are passionate about the game
- Want an easy way to learn new strategies
- Tetris players opinion is essential for our project ideas and development
- Reaching out to all of Tetris players out there
- Trying to reach out to Top players and hear their voice 
- Our audience and users are across the globe - there are no borders in Tetris game and its community
- They get their information on online community - twowi.de and four.lol

### What

- Wiki with static pages to display the knowledge
- The static pages will be stored with markdown in Mongo DB
- They will be generated via SSR with express JS
- In order to display the methods properly we need to generate tetris SVGs
- React app that lets users interact with the knowledge
- Takes a board state, piece queue, and solution data as inputs
- Personalized settings from cookies
- Depending on the topic and user interaction will provide appropriate feedback

### Topic types and REACT app behaviour

- Openers
    - Empty board state
    - Set piece queue
    - Place all pieces with multiple solutions
- T Spin Methods
    - Set board state
    - Set piece queue
    - Place all pieces with one solution
- Finesse
    - Set board state
    - Set piece queue
    - Show where to place each piece with one finesse solution 
- Perfect clear Methods
    - Empty/ Set board state
    - Set piece queue
    - Place all pieces with one solution (empty board)
- Downstacking methods
    - Set board state
    - Set piece queue
    - Places all pieces with one solution
- Kicks
    - Set board state
    - Set piece queue
    - Show where to place each piece with one solution

### Minimum Viable Products

#### MVP 1

- Catalog strategies or techniques with community feedback
- Wiki style sharing of knowledge

#### MVP 2

- Members can interact with an embedded game