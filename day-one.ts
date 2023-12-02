// DAY 1: Trebuchet‽

async function partone() {
  // read input file
  const input_file = Bun.file("./inputs/day-one_part-one.txt");
  const text = await input_file.text();
  const lines = text.split("\n");
  
  let sum = 0;
  
  // read each line
  for (const line of lines) {
    const numbers : string[] = [];

    // check each character if they are numeric
    for (const char of line) {
      if (Number(char)) { numbers.push(char); }
    }

    // if no numbers 
    if (numbers.length === 0) { continue; }

    sum += Number(numbers[0] + numbers[numbers.length - 1]);
  }

  return sum;
}

async function parttwo() {
  // read input file
  const input_file = Bun.file("./inputs/day-one_part-two.txt");
  const text = await input_file.text();
  const lines = text.split("\n");
  
  let sum = 0;

  // regex
  const numeric_match = /(?=(one|two|three|four|five|six|seven|eight|nine))|\d/g;

  // key values
  const parsed_numbers : Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  // read each line
  for (const line of lines) {
    let numbers : string[] = [];

    // regex
    numbers = [...line.matchAll(numeric_match)].map(
      (m) => {
        if (m[0] === "") { return m[1]; }
        else { return m[0]; }
      }
    );

    if (numbers.length === 0) { continue; }

    const first = numbers[0];
    if (numbers.length === 1) {
      let digits = "";
      if (Number(first)) { 
        digits = first + first;
        sum += Number(first + first); 
      }
      else {
        digits = parsed_numbers[first] + parsed_numbers[first]
        sum += Number(parsed_numbers[first] + parsed_numbers[first]);
      }
      console.log(numbers, {line, digits});
    }
    else {
      const last = numbers[numbers.length - 1];
      let digits = "";

      if (Number(first)) { digits += first; }
      else {
        digits += parsed_numbers[first];
      }

      if (Number(last)) { digits += last; }
      else {
        digits += parsed_numbers[last];
      }

      sum += Number(digits);
      console.log(numbers, {line, digits});
    }

  }

  return sum;
}

console.log(await partone());
console.log(await parttwo());
