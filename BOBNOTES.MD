# Bob's Brain Control Station

### Thought Process and notes

0. Learn to play Mindsweeper
1. Get environment up, check for dependencies
2. Review assignment (README.md)
2. Review code: (understand the parameters, discover what's already coded)
3. Make a "Plan of Attack"

### Plan of Attack

1. ✅ Display complete grid with hidden bombs
  - Starter code only renders a single cell. Start by adding rows & columns.
2. 🔥 Click events > reveal bombs or empty
3. Check Surrounding cells: logic first (Populate object)
4. Add recursive Check: logic first (Populate object)
5. Add to UI
6. Test
7. Refactor
8. Review and add notes

### Time tracker

1. download code and review (10 min.)
2.

### Why I added ComponentWillMount

* I wanted to add a mine counter to the game.
* However, I couldn't set the state of another field before the component had been mounted.
* So, having one field dependent on another, required the component to be mounted to add the additional state variable to the game instance.

### Why I added componentDidUpdate

* Edge case handler: When the final cells are populated recursivily the state isn't updated until after logic. Therefore, it doesn't trigger that you've WON.
* So, by tying the winner event in the componentDidUpdate life-cycle, we can wait until the component updates to check for winners.

### Feature Enhancements (Ideas)

- Right Click to show flags:
- Add 7-segment counter

# Resources:
- https://www.instructables.com/id/How-to-play-minesweeper/
- http://minesweeperonline.com/
- https://www.google.com/search?q=how+to+play+minesweeper&oq=how+to+play+minesweeper&aqs=chrome.0.69i59j0l5.2065j0j4&sourceid=chrome&ie=UTF-8#kpvalbx=_OBo7Xen1Ha6AtgW7rajABw28
- https://codepen.io/robbobfrh84/pen/RXGXWN?editors=0010
