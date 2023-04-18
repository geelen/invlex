import assert from 'node:assert'

const Z_ASCII = 122
const BASE = 64

function toInvLex(n: number) {
  if (n > Number.MAX_SAFE_INTEGER)
    throw new Error(`9 million billion isn't enough for you?`)
  const digits = n.toString(BASE).length
  const inverse = BASE ** digits - n - 1
  const hex = inverse.toString(BASE).padStart(digits, '0')
  const prefix = String.fromCharCode(Z_ASCII - (digits - 1))
  // console.log({n, digits, inverse, hex, prefix})
  return prefix + hex
}

function fromInvLex(str: string) {
  const [prefix, ...hex] = str
  const digits = Z_ASCII - prefix.charCodeAt(0) + 1
  // console.log({str, prefix, hex, digits})
  if (hex.length !== digits)
    throw new Error(
      `Malformed InvLex string, expected ${digits} digit(s) for '${str}', got ${hex.length}.`
    )
  return BASE ** digits - parseInt(hex.join(''), BASE) - 1
}

// Mostly small, some huge numbers
const random = () =>
  Math.round(Math.random() * 20 + Math.random() ** 50 * Number.MAX_SAFE_INTEGER)

const numbers = Array.from(new Set(new Array(50).fill(null).map(random))) // unique randoms
console.log(numbers)

const names = numbers.map(toInvLex)
console.log(names)

const sorted_numerically = [...numbers].sort((a, b) => b - a);
console.log(sorted_numerically) // inverse numeric sort
const sorted_lexicographically = [...names].sort();
console.log(sorted_lexicographically)

assert.deepEqual(sorted_lexicographically, sorted_numerically.map(toInvLex))

// Show that it's reversible
numbers.forEach((n, i) =>
  console.log(`${n} => ${names[i]} => ${fromInvLex(names[i])}`)
)
