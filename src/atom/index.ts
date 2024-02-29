import { StoreType } from '@/interface'
import { atom } from 'recoil'

export const mapState = atom({
    key: 'map',
    default: null,
    dangerouslyAllowMutability: true,
})

export const currentStoreState = atom<StoreType | null>({
    key: 'store',
    default: null,
})