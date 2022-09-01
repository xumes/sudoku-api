# sudoku-api

A playable sudoku game RESTfull API

## Installation

> Docker is required.

```console
git clone git@github.com:xumes/sudoku-api.git

cd sudoku-api

npm run dev
```

When you see the message Server is running at port: 3000 the game is up and running

## Unit Tests

Run all test cases

```console
npm test
```

Run test coverage

```console
npm run test:coverage
```

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

## How to play

- First start a new board `POST /board`
- Place numbers into the board `POST /board/move` sending the move in the board
- You can undo a move if there is one to undo at `PUT /board/move`
- Or you can clear any spot that has a valid number, at any time by sending the current value and position to `DELETE /board/move`
- At any time, you can check your latest move at `GET /board/move`
- Or you can check how is the board at `GET /board`
- Remember to always check the **winner** key in the response and celebrate when it returns **_true_**

See details on our Swagger documentation running the aplication and navigating to `/docs`

## Future releases

Features that can be implemented to keep the game growing:

- The board accepts an initial setup, my idea was to create difficult levels, or allow user to start any configuration
- To make this happen, I need to implement more validations on the starterBoard to ensure I don't allow an impossible (broken) game to start
- Add more unit test to have more coverage
- Allow users to identify themselves
- Create a leaderboard with the number of moves of each user that completes the board
