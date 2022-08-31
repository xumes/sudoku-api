# sudoku-api

A playable sudoku game RESTfull API

## Installation

```console
git clone git@github.com:xumes/sudoku-api.git

cd sudoku-api

docker compose up
```

When you see the message Server is running at port: 3000 the game is up and running

## Considerations

- The game assumes that row and column begins at position 0, which means that the board goes from [0, 0] to [8, 8]
- The game only accepts numbers from 1 to 9
- Movements you can do:
  - Start a new game
  - Place a number in the board
  - Undo a move
  - Erase a number from the board
  - Check the current board
  - Check your latest move
- The sessions lives during 8 hours. After that, your board is deleted and you need to start a new one
- You don't need to identify yourself
