const { plot } = require('plotter')

// This is an instrumentation function to help us determine how long something
// takes to run.
let start = process.hrtime()
const elapsedTime = () => {
    // hrtime() returns an array of seconds and ns. let's convert it to ms.
    const elapsed = process.hrtime(start)[0] * 1000 + process.hrtime(start)[1] / 1000000

    // reset the clock
    start = process.hrtime()

    return elapsed.toFixed(3)
}

// This is a recursive function to calculate a Fibonacci number.
function recursiveFibonacci(n) {
    if (n < 2) return n

    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2)
}

// This is a memoized recursive function to calculate a Fibonacci number.
const memo = {}
function memoizedRecursiveFibonacci(n) {
    // Is the value we want in the memo already?
    if (n in memo) {
        return memo[n]
    }

    // If we get here, this is our first time calculating this value.
    let value
    if (n < 2) {
        value = n
    } else {
        value = memoizedRecursiveFibonacci(n - 1) + memoizedRecursiveFibonacci(n - 2)
    }

    // Store the results of this computation in our memo for the next iteration
    // before we return it.
    memo[n] = value

    return value
}

function fibonacci(n) {
    // Instantiate our array for the first two elements of the sequence.
    const sequence = [0, 1]

    // Populate the array every time up to the array element that we need.
    for (let i = 2; i <= n; i++) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2])
    }

    return sequence[n]
}

// Instrumentation
const runtimes = []
for (let i = 0; i <= 1400; i++) {
    console.log(`F${i} =`, fibonacci(i))
    runtimes.push(elapsedTime())
}

const recursiveRuntimes = []
for (let i = 0; i <= 50; i++) {
    console.log(`F${i} =`, recursiveFibonacci(i))
    recursiveRuntimes.push(elapsedTime())
}

const memoizedRecursiveRuntimes = []
for (let i = 0; i <= 1400; i++) {
    console.log(`F${i} =`, memoizedRecursiveFibonacci(i))
    memoizedRecursiveRuntimes.push(elapsedTime())
}

plot({
    data: {
        iterative: runtimes,
        recursive: recursiveRuntimes,
        memoized: memoizedRecursiveRuntimes,
    },
    filename: 'fibonacci-comparisons.png',
    style: 'linespoints',
    logscale: true,
    xlabel: 'n',
    ylabel: 'Time (ms)',
})
