import { Link } from 'react-router-dom'

export const SecondPage = () => {
    return (
        <div>
            This is the second page! Welcome!
            <Link to={'/'}>Go to home page!</Link>
        </div>
    )
}
