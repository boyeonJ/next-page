import { atom } from 'recoil'

export const mapState = atom({
    key: 'map',
    default: null,
    dangerouslyAllowMutability: true,
})