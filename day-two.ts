// DAY 2: NOTES
// cube: red green blue
// each round, elf will hide a secret number of cubes of each color
// elf will reach in the bag, show them to you, then put em back, do this multiple times per game
// record the info from each game with a game ID 

import { on } from "stream";

/**
  * Game #: # color; # color, # color; # color
  * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green 
  */

// The Elf would first like to know which games would have been possible if the bag
// contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

// What is the sum of the IDs of those /possible/ games?


async function partone() {
  // read input file
  const input_file = Bun.file("./inputs/day-two_part-one.txt");
  const text = await input_file.text();
  const lines = text.split("\n");

  // constraints for possible games
  const red_constraint = 12;
  const green_constraint = 13;
  const blue_constraint = 14;

  let sum = 0;
  
  // go through each game
  for (const line of lines) {
    const [ game, rounds ] = line.split(":");

    const game_id = Number(game.matchAll(/\d+/g).next().value as string);
    if (!game_id) { continue; }

    const subsets = rounds.split(";");

    let is_valid = true;
    for (const pulls of subsets) {
      const blocks = pulls.split(",");

      for (const pull of blocks) {
        const num = Number(pull.matchAll(/\d+/g).next().value);
        const color = pull.matchAll(/[a-z]+/g).next().value[0];

        switch (color) {
          case "red": is_valid = (num <= red_constraint); break;
          case "green": is_valid = (num <= blue_constraint); break;
          case "blue": is_valid = (num <= green_constraint); break;
        }
        if (!is_valid) { break; }
      }
      if (!is_valid) { break; }
    }
    if (is_valid) { sum += game_id; }
  }


  return sum;
}

async function parttwo() {

  // read input file
  const input_file = Bun.file("./inputs/day-two_part-one.txt");
  const text = await input_file.text();
  const lines = text.split("\n");

  let sum = 0;

  for (const line of lines) {
    const [ game, rounds ] = line.split(":");

    const game_id = Number(game.matchAll(/\d+/g).next().value as string);
    if (!game_id) { continue; }

    const subsets = rounds.split(";");

    let red_max = 0;
    let green_max = 0;
    let blue_max = 0;

    for (const pulls of subsets) {
      const blocks = pulls.split(",");

      for (const pull of blocks) {
        const num = Number(pull.matchAll(/\d+/g).next().value);
        const color = pull.matchAll(/[a-z]+/g).next().value[0];

        switch (color) {
          case "red": red_max = Math.max(red_max, num); break;
          case "green": green_max = Math.max(green_max, num); break;
          case "blue": blue_max = Math.max(blue_max, num); break;
        }
      }
    }
    
    sum += (red_max * green_max * blue_max);
  }

  return sum;
}

console.log("[Part 1] sum:", await partone());
console.log("[Part 2] sum:", await parttwo());
