import Link from "next/link";

export default function Navbar() {

    return (
        <nav className="bg-gray-700 text-white">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/">Pokemons</Link>
                </li>
                <li>
                    <Link href="/">About</Link>
                </li>
            </ul>
        </nav>
    )
}