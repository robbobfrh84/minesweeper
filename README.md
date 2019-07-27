# Minesweeper

A simple Minesweeper clone using ReactJS!

## Setup

To start the React app, run `yarn && yarn start` and go to localhost:3000.

## Spec

The implementation should includes the following:

* ✅ The board contains mines.
* ✅ A board renders. (Markup and styles are provided.)
* ✅ Revealed cells show a mine, or a count of adjacent mines.
* ✅ Revealed cells with zero adjacent mines should be blank.
* ✅ Clicking an unrevealed cell reveals it.
* ✅ Clicking an unrevealed cell with zero adjacent mines recursively reveals all adjacent cells.


# Bob Main's Developer Notes

### Thought Process and notes

0. ✅ Learn to play Mindsweeper
1. ✅ Get Developer environment up (check dependencies)
2. ✅ Review assignment (README.md)
2. ✅ Review code: (understand the parameters, discover what's already coded)
3. ✅ Make a "Plan of Attack"
4. ✅ Test
5. ✅ Create public Github Repository
6. ✅ Add github-deploy package for live example
7. ✅ Submit for review


### Plan of Attack

1. ✅ Display complete grid with hidden bombs
  - Starter code only renders a single cell. Start by adding rows & columns.
2. ✅ Click events > reveal bombs or empty
3. ✅ Check Surrounding cells: logic first (Populate object)
4. ✅ Add recursive Check: logic first (Populate object)
5. ✅ Add to UI
6. ✅ Test
7. ✅ Refactor
8. 🔥Review and add notes

### Time tracker

1. Download code and review (10 min.)
2. Adding blank game board (15 min.)
3. Create Recursive login (20 min.)
4. User gameplay cycle (30 min.)
5. Refactor and Deploy (20 min.)

### NOTE: Why I added ComponentWillMount

* I wanted to add a mine counter to the game.
* However, I couldn't set the state of another field before the component had been mounted.
* So, having one field dependent on another, required the component to be mounted to add the additional state variable to the game instance.

### NOTE: Why I added componentDidUpdate

* Edge case handler: When the final cells are populated recursively the state isn't updated until after logic completes. Therefore, it doesn't trigger that you've WON.
* So, by tying the winner event in the componentDidUpdate life-cycle, we can wait until the component updates to check for winners.

### Feature Enhancements (Ideas)

- Right Click to show flags: 🤔this could be updated for 2019 (Hover + space?)
- Add 7-segment counter
  - Example: https://codepen.io/robbobfrh84/pen/RXGXWN?editors=0010

# Resources:
- How to play: https://www.instructables.com/id/How-to-play-minesweeper/
- Play example online for free: http://minesweeperonline.com/
  - Example 2: https://www.google.com/search?q=how+to+play+minesweeper&oq=how+to+play+minesweeper&aqs=chrome.0.69i59j0l5.2065j0j4&sourceid=chrome&ie=UTF-8#kpvalbx=_OBo7Xen1Ha6AtgW7rajABw28
