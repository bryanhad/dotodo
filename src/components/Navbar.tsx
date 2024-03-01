import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="flex justify-center my-[50px]">
            <Link to={'/'}>
                <h1 className="text-4xl font-semibold">DOTODO</h1>
            </Link>
        </nav>
    )
}
