import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom"
import { routes } from "./routes"
import { AppRoute } from "./types"

// Recursive converter
const convertRoutes = (appRoutes: AppRoute[]): RouteObject[] => {
    return appRoutes.map((route) => {
        if (route.index) {
            return {
                index: true,
                element: route.element,
            }
        }

        return {
            path: route.path,
            element: route.element,
            children: route.children ? convertRoutes(route.children) : undefined,
        }
    })
}

export default function AppRoutes() {
    const router = createBrowserRouter(convertRoutes(routes))
    return <RouterProvider router={router} />
}
