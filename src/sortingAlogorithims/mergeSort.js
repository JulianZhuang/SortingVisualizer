export function getMergeSortAnime(array) {
    const anime = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, anime);
    return anime;
}

// To split the array recurisively
function mergeSortHelper(
    mainArray, 
    startIdx, 
    endIdx, 
    auxiliaryArray, 
    anime,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    // The first half
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, anime);
    // The second half
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, anime);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, anime);
}

// Better to simultaneously read with mergeSort() in SortingVisualizer.jsx 
// to comprehend this function
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let mainStart = startIdx;
    let auxiliaryStart = startIdx;
    let middle = middleIdx + 1;
    while (auxiliaryStart <= middleIdx && middle <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([auxiliaryStart, middle]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([auxiliaryStart, middle]);
      if (auxiliaryArray[auxiliaryStart] <= auxiliaryArray[middle]) {
        // We overwrite the value at index mainStart in the original array with the
        // value at index auxiliaryStart in the auxiliary array.
        animations.push([mainStart, auxiliaryArray[auxiliaryStart]]);
        mainArray[mainStart++] = auxiliaryArray[auxiliaryStart++];
      } else {
        // We overwrite the value at index mainStart in the original array with the
        // value at index middle in the auxiliary array.
        animations.push([mainStart, auxiliaryArray[middle]]);
        mainArray[mainStart++] = auxiliaryArray[middle++];
      }
    }
    // Clear up 
    while (auxiliaryStart <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([auxiliaryStart, auxiliaryStart]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([auxiliaryStart, auxiliaryStart]);
      // We overwrite the value at index mainStart in the original array with the
      // value at index auxiliaryStart in the auxiliary array.
      animations.push([mainStart, auxiliaryArray[auxiliaryStart]]);
      mainArray[mainStart++] = auxiliaryArray[auxiliaryStart++];
    }
    while (middle <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([middle, middle]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([middle, middle]);
      // We overwrite the value at index mainStart in the original array with the
      // value at index middle in the auxiliary array.
      animations.push([mainStart, auxiliaryArray[middle]]);
      mainArray[mainStart++] = auxiliaryArray[middle++];
    }
}


// Mergesort alogorithim without anime
// export const mergeSort = array => {
//     if (array.length===1) return array;
//     const middleIdx = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIdx));
//     const secondHalf = mergeSort(array.slice(middleIdx));
//     const sortedArray = [];
    
//     let i = 0, 
//         middle = 0;
//     while (i < firstHalf.length && middle < secondHalf.length) {
//         if (firstHalf[i] < secondHalf[middle]) {
//             sortedArray.push(firstHalf[i++]);
//         } else {
//             sortedArray.push(secondHalf[middle++]);
//         }
//     }
//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (middle < secondHalf.length) sortedArray.push(secondHalf[middle++]);
//     return sortedArray;
// };