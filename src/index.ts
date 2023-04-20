import createInvlex from './encoder'

export const base16 = createInvlex(16)
export default base16

export const base32 = createInvlex(32)
export const base36 = createInvlex(36)
export const base62 = createInvlex(62)
