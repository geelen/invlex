import assert from 'node:assert'

const INVERSE_BASE = {
  36: 'zyxwvutsrqponmlkjihgfedcba9876543210',
  62: 'zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA9876543210',
}

const toBase = (base: keyof typeof INVERSE_BASE) => (num: number) => {
  let result = ''
  do {
    result = INVERSE_BASE[base][num % base] + result
    num = Math.floor(num / base)
  } while (num > 0)
  return result
}

const fromBase = (base: keyof typeof INVERSE_BASE) => (str: string) => {
  let num = 0
  for (let i = 0; i < str.length; i++) {
    num = num * base + INVERSE_BASE[base].indexOf(str.charAt(i))
  }
  return num
}

const Z_ASCII = 122
for (const BASE of [16, 32, 36, 62]) {
  function toInvLex(n: number) {
    if (n > Number.MAX_SAFE_INTEGER)
      throw new Error(`9 million billion isn't enough for you?`)

    let encoded
    if (BASE === 62 || BASE === 36) {
      encoded = toBase(BASE)(n)
    } else {
      const digits = n.toString(BASE).length
      const inverse = BASE ** digits - n - 1
      encoded = inverse.toString(BASE).padStart(digits, '0')
    }

    const prefix = String.fromCharCode(Z_ASCII - (encoded.length - 1))
    // console.log({ n, digits: encoded.length, encoded, prefix })
    return prefix + encoded
  }

  function fromInvLex(str: string) {
    const [prefix, ...hex] = str
    const digits = Z_ASCII - prefix.charCodeAt(0) + 1
    // console.log({str, prefix, hex, digits})
    if (hex.length !== digits)
      throw new Error(
        `Malformed InvLex string, expected ${digits} digit(s) for '${str}', got ${hex.length}.`
      )
    return BASE in INVERSE_BASE
      ? fromBase(BASE as keyof typeof INVERSE_BASE)(hex.join(''))
      : BASE ** digits - parseInt(hex.join(''), BASE) - 1
  }

  // Mostly small, some huge numbers
  const random = () =>
    Math.round(
      Math.random() * 20 + Math.random() ** 50 * Number.MAX_SAFE_INTEGER
    )

  const numbers = new Array(200).fill(null).map((_, i) => i) //Array.from(new Set(new Array(2000).fill(null).map(random))) // unique randoms
  console.log(numbers)

  const names = numbers.map(toInvLex)
  console.log(names)

  const sorted_numerically = [...numbers].sort((a, b) => b - a)
  console.log(sorted_numerically) // inverse numeric sort
  const sorted_lexicographically = [...names].sort()
  console.log(sorted_lexicographically)

  assert.deepEqual(sorted_lexicographically, sorted_numerically.map(toInvLex))

  // Show that it's reversible
  numbers.forEach((n, i) =>
    console.log(`${n} => ${names[i]} => ${fromInvLex(names[i])}`)
  )
}
