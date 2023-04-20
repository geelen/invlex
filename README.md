# invlex — Inverse Lexicographic Encoding

For encoding numbers so that higher numbers appear first, sorted lexicographically (i.e. in a cloud storage bucket that only has ascending LIST operations), in as few bytes as possible.

## Usage

```sh
npm install --save-dev invlex
pnpm add -D invlex
```

```ts
import invlex from 'invlex'

invlex.encode(0) // "zf"
invlex.encode(1) // "ze"
invlex.encode(15) // "z0"
invlex.encode(16) // "yef"
invlex.encode(1959) // "x858"
invlex.encode(49584741) // "td0b659a"
invlex.encode(350371465044) // "qae6c3bb8ab"
invlex.encode(84296151321634) // "ob35545d833dd"
```

```ts
import { base32 as invlex } from 'invlex'

invlex.encode(0) // "zv"
invlex.encode(1) // "zu"
invlex.encode(15) // "zg"
invlex.encode(16) // "zf"
invlex.encode(1959) // "xu2o"
invlex.encode(49584741) // "uugmpcq"
invlex.encode(350371465044) // "slpm3ne5b"
invlex.encode(84296151321634) // "qtjal2tgcut"
```

```ts
import { base62 as invlex } from 'invlex'

invlex.encode(0) // "zz"
invlex.encode(1) // "zy"
invlex.encode(15) // "zk"
invlex.encode(16) // "zj"
invlex.encode(1959) // "yUO"
invlex.encode(49584741) // "vwdwk6"
invlex.encode(350371465044) // "ttpYL2Pz"
invlex.encode(84296151321634) // "sc3uyZfif"
```

## Format

Numbers are converted to a hex string (or base-32 or base-64 string, see below), then inverted (so "001" becomes "ffe"), then prefixed with a single letter that encodes the length, starting at 'z' and moving up the alphabet, meaning that longer (larger) numbers appear first when sorted lexicographically.

This uses a lot less bytes than a naive approach (`Number.MAX_SAFE_INTEGER - n`, for example), and by converting to hex/base32/64, makes the IDs look opaque enough to not look obviously "wrong"


## Development

```sh
pnpm install
pnpm tsx index.ts
```

```js
[
           17,             15,
   8799836659,             12,
            7,             19,
            4,             16,
          162,           1278,
    421715849,  7203223790733,
           13,             10,
  11204850556, 24505179268642,
    142380296
]
[
  'ze',       'zg',
  'tnpnq9gc', 'zj',
  'zo',       'zc',
  'zr',       'zf',
  'yqt',      'xuo1',
  'ujdq83m',  'rpebf6f6ri',
  'zi',       'zl',
  'tli27343', 'r9mpont6et',
  'uro6snn'
]
[
  24505179268642, 7203223790733,
     11204850556,    8799836659,
       421715849,     142380296,
            1278,           162,
              19,            17,
              16,            15,
              13,            12,
              10,             7,
               4
]
[
  'r9mpont6et', 'rpebf6f6ri',
  'tli27343',   'tnpnq9gc',
  'ujdq83m',    'uro6snn',
  'xuo1',       'yqt',
  'zc',         'ze',
  'zf',         'zg',
  'zi',         'zj',
  'zl',         'zo',
  'zr'
]
17 => ze => 17
15 => zg => 15
8799836659 => tnpnq9gc => 8799836659
12 => zj => 12
7 => zo => 7
19 => zc => 19
4 => zr => 4
16 => zf => 16
162 => yqt => 162
1278 => xuo1 => 1278
421715849 => ujdq83m => 421715849
7203223790733 => rpebf6f6ri => 7203223790733
13 => zi => 13
10 => zl => 10
11204850556 => tli27343 => 11204850556
24505179268642 => r9mpont6et => 24505179268642
142380296 => uro6snn => 142380296
```
