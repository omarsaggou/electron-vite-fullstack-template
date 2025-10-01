import { ReactNode } from "react"

export interface AppRoute {
    path?: string
    element: ReactNode
    private?: boolean
    index?: boolean
    label?: string
    children?: AppRoute[]
}
