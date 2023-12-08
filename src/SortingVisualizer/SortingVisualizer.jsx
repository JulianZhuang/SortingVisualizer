import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnime} from '../sortingAlogorithims/mergeSort.js';
import crying from '../crying.jpg';
import celebrate from '../celebrate.jpg';
//import * as sortingAlogorithims from '../sortingAlogorithims/sortingAlogorithims.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

const DEFAULT_COLOR = 'lightgray';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        //object literal ?????????????????????????????????????????????
        this.state = {
            array: [],
            barColor: 'lightgray',
            currentImage: crying,
            image1: crying,
            image2: celebrate,
        };
        this.changeBarColor = this.changeBarColor.bind(this);
        this.changeImage = this.changeImage.bind(this);
    }

    // activated when this object is loaded for the first time
    componentDidMount() {
        this.resetArray();
    }

    // Duplicate values are and should be allowed
    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            // If randomIntFromInterval(1, 1000), the bar can be rarely seen since it'd too short 
            array.push(randomIntFromInterval(8, 300));
        }
        
        this.setState({array});
    }

    changeBarColor() {
        this.setState({barColor: 'lightgray'});
        const arrayBars = document.getElementsByClassName('array-bar');
       
        const barStyle = arrayBars.style;
        barStyle.backgroundColor = 'lightgray';
        
    }

    changeImage(doraemonHero) {
        this.setState({
            currentImage: doraemonHero ? this.state.image2 : this.state.image1
        });
    }

    // mergeSort without anime
    // mergeSort() {
    //     const sortedArray = sortingAlogorithims.mergeSort(this.state.array);
    //     console.log(sortedArray);
    // }
    mergeSort() {

        const animations = getMergeSortAnime(this.state.array);
        
        for (let i=0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          
          // i == 0, 1,  3, 4  6,7
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            // 0, 3, 6
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS); 
          } else { // i == 2, 5, 8, 11
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
        setTimeout(() => {
            this.changeImage(true);
          }, (animations.length + 10) * ANIMATION_SPEED_MS);        
      }

    quickSort() {}

    heapSort() {}

    // testSortingAlogorithims() {
    //     for (let i = 0; i < 100; i++) {
    //         const array = [];
    //         const length = randomIntFromInterval(1, 1000);
    //         for (let j = 0; j < 100; j++) {
    //             array.push(randomIntFromInterval(-1000, 1000));
    //         }
    //         const jsSortedArray = array.slice().sort((a, b) => a - b);
    //         const mergeSortArray = sortingAlogorithims.mergeSort(array.slice());
    //         console.log(arraysAreEqual(jsSortedArray, mergeSortArray));
    //     }
    // }

    render() {
        const {array, barColor, currentImage} = this.state;
        return (
            <div className='nobita-room'>
                <div className='doraemon'>
                    <img src={currentImage} alt="Nobita messed up his room" />
                    <p>Please help me Doramon!</p>
                </div>
                <div className='toolbar'>
                    <button onClick={()=> {
                        this.resetArray(); 
                        this.changeBarColor(); 
                        this.changeImage(false)}} id='bell'>New Array</button>
                    <button onClick={()=> this.mergeSort()}>Merge Sort</button>
                    <button onClick={()=> this.quickSort()}>Quick Sort</button>
                    <button onClick={()=> this.heapSort()}>Heap Sort</button>
                    {/* <button onClick={()=> this.testSortingAlogorithims()}>Test</button> */}
                </div>
                <div className='array-container'>    
                    {array.map( (value, idx) => (
                        <div 
                            className='array-bar' 
                            key='idx'
                            style={{height: `${value}px`, backgroundColor: barColor}}></div>
                    ))}
                </div>
            </div>
        );
    }
}

// From stackoverflow.com
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if(arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}
