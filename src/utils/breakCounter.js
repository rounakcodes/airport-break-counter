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
approach 3: forget about looping through every item, this problem is about jumping, if jump fails, save the failed jump index, retrace back one index and continue. If saved index is encountered again, then return failure. Update: A failure test case was provided for this logic: [3, 5, 3, 4, 0, 0, 3, 1, 0, 1]. A counter for tracking the retracement was added to fix it. But it gets complicated when the counter itself needs to be reset.
approach 4: Retracing issue in approach 3 causes a rethink of approach. Instead of being worried about failing jumps, we need to focus on maximum reach from any index. Assume that we always reach the end of the array. Loop through the array. Save the indexed jumped to by the first item in the array as maxIndex. Let the next jumps compete with that index to update the maxIndex. We maintain a failureIndex which we set to maxIndex initially and then everytime we reach the failureIndex in the array, we again set it to the maxIndex. That way we know where to increment our jump counter
*/

// We are not able to reuse our plane even if it has fuel left after landing. This situation resembles a break journey. Our task is to find the number of breaks in our journey. Hence, the name *countBreaks*.
export const countBreaks = (arr) => {
  let breaks = 0;
  let maxIndex = 0;
  let failureIndex = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    // maxIndex will hold our maximum reach from each index in the array
    maxIndex = Math.max(maxIndex, i + arr[i]);
    // will be true
    // - for the first item in the array
    // - if we reach the index which was our saved maximum reach 
    // - What is saved maximum reach?
    //   - initially: the maximum reach of our first item in the array
    //   - later: when we arrive at the index which was our maximum reach, the new maximum reach at that index
    // - this is also the point where we update our break count because before this point there was no need to
    if (i === failureIndex) {

      breaks++;
      failureIndex = maxIndex;
    }
  }
  // we have not reached the destination
  if (maxIndex < arr.length-1) return -1;
  return breaks;
};

// const data1 = [2, 1, 2, 3, 1]; // 2
// const data2 = [1, 6, 3, 4, 5, 0, 0, 0, 6]; // 3
// const data3 = [1, 1, 3, 3, 2, 0, 0, 6]; // -1
// const data4 = [0, 1, 3, 3, 2, 0, 0, 6]; // -1
// const data5 = [1, 1, 1, 4, 2, 0, 0, 6, 7]; // 5
// const data6 = [1, 1, 1, 4, 2, 0, 0, 0, 7];  // -1
// const data7 = [1, 1, 1, 4, 6, 0, 0, 0, 0]; // 5
// const data8 = [1, 1]; // 1
// const data9 = [3, 5, 3, 4, 0, 0, 3, 1, 0, 1]; // 3
// console.log(countBreaks(data1));
// console.log(countBreaks(data2));
// console.log(countBreaks(data3));
// console.log(countBreaks(data4));
// console.log(countBreaks(data5));
// console.log(countBreaks(data6));
// console.log(countBreaks(data7));
// console.log(countBreaks(data8));
// console.log(countBreaks(data9));
