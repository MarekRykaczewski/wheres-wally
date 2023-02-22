import { Auth } from "./Auth"

export const Nav = () => {
    return (
        <nav className="nav">
            <h1 className="nav--title"> Where's Wally </h1>
            <Auth />
        </nav>
    )
}