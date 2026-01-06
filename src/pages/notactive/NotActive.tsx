import { useSearchParams } from "react-router-dom";

export default function NotActive() {
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status");

    return (
        <div>{status} User</div>
    )
}