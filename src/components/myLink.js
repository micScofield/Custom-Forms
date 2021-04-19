import { Link } from 'react-router-dom'

export function myLink(label, to) {
    return <Link to={to}>{label}</Link>
}