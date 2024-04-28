import Link from "next/link";
export const Header =()=>{
    return (
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/about-us">About us</Link>
        </nav>
      </header>
    );
}