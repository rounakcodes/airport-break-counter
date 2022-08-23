/*
Consider there are **N** airports in the world, each airport has a plane available with limited units of fuel available to fly. 

You are initially positioned at airport **number one** and you have to reach the last airport (**N**) by hiring minimum numbers of planes. You'd need 1 unit of fuel to fly to the nearest airport from any airport. 

You will be given an array of N numbers each representing the units of fuel available in the plane at that particular airport. Print the number of planes you'd need to hire to reach the last airport. If it is not possible to reach the last airport, return -1
*/

/*
Thought process:
n airplanes lie linearly in n unique places
x number of units of fuel is present in each plane
Our inital position: 1
Objective is to reach the nth place
Constraint: To move to the nearest place, one unit of fuel is required
sample data: [2,1,2,3,1]
approach 1: with 2 fuel units whether to land at index 1 or index 2
  - decision 1: choosing to land at index 1 would cause to move to index 2 as next move
    - but think of [1,6,3,4,5,0,0,0,6]
      - if only reaching farther is the motive for choosing an index, we fail if we select index 1
      - so try all paths from every place and check what leads to destination
        - this suggests recursion
          - but trying all paths complicates recursion
approach 2: reverse approach
  - start with destination, find the nearest place from which destination can be reached
    - if there is no such place we save on needless computations
  - if there is such place, we try to find the farthest such place
  - again recurse from that place
approach 3: forget about looping through every item, this problem is about jumping, if jump fails, save the failed jump index, retrace back one index and continue. If saved index is encountered again, then return failure.
*/

// We are not able to reuse our plane even if it has fuel left after landing. This situation resembles a break journey. Our task is to find the number of breaks in our journey. Hence, the name *countBreaks*.
export const countBreaks = (arr) => {
  let breakCount = 0;
  let failures = [];
  let index = 0;
  const lastIndex = arr.length - 1;
  // our goal is for the index to be equal to or greater than the last index in the array
  while (index < lastIndex) {
    if (arr[index] > 0) {
      index = index + arr[index];
      breakCount++;
    } else {
      index = index - 1;
      // if we are reaching an index for the second time, we will be reaching it forever, so return failure
      if (failures.includes(index) || index < 0) return -1;
      failures.push(index);
    }
  }
  return breakCount;
};

export const countBreaksWithAirports = (arr) => {
  let breakCount = 0;
  let failures = [];
  let index = 0;
  let airports = [];
  const lastIndex = arr.length - 1;
  // our goal is for the index to be equal to or greater than the last index in the array
  while (index < lastIndex) {
    if (arr[index] > 0) {
      index = index + arr[index];
      airports.push(index);
      breakCount++;
    } else {
      airports.pop();
      index = index - 1;
      airports.push(index);
      // if we are reaching an index for the second time, we will be reaching it forever, so return failure
      if (failures.includes(index) || index < 0)
        return { breakCount: -1, airports: [] };
      failures.push(index);
    }
  }
  return { breakCount, airports };
};
// const data1 = [2, 1, 2, 3, 1];
// console.log(countBreaks(data1));
/* Sample Data
const data1 = [2, 1, 2, 3, 1];
const data2 = [1, 1, 3, 4, 5, 0, 0, 0, 6];
const data3 = [1, 1, 3, 3, 2, 0, 0, 6];
const data4 = [0, 1, 3, 3, 2, 0, 0, 6];
const data5 = [1, 1, 1, 4, 2, 0, 0, 6, 7];
const data6 = [1, 1, 1, 4, 2, 0, 0, 0, 7];
const data7 = [1, 1, 1, 4, 6, 0, 0, 0, 0];
const data8 = [1, 1];
console.log(countBreaks(data1));
console.log(countBreaks(data2));
console.log(countBreaks(data3));
console.log(countBreaks(data4));
console.log(countBreaks(data5));
console.log(countBreaks(data6));
console.log(countBreaks(data7));
console.log(countBreaks(data8));
*/
