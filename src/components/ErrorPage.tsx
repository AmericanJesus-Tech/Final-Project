import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error: any = useRouteError()
    return (
        <div className="text-danger">
            {error.message || error.statusText}
        </div>
    )
}