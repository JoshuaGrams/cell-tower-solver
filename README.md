A solver for [Cell Tower][1] word puzzles.

I made this to check my intuition that the solutions were unique.
Uses [node.js][2].

Puzzles are entered directly in the `solver.js` file: they look
like this (remove the `true,` to avoid printing the solution for
this puzzle):

```JavaScript
const p6 = new Puzzle(7, 12, true,
	'SLCEWOROCNTPTHWOURUTEURSYTXPESCHRECPANACET',
	'EANELEDEKENTITXFLOWNECIEECRWLULHAANDEDINTS')
```

To run the solver, do `node solver.js` at a command prompt.

[1]: https://www.andrewt.net/puzzles/cell-tower/
[2]: https://nodejs.org/en/
