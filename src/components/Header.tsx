// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from "./ModeToggle";
import { buttonVariants } from "@/components/ui/button"
import Container from './Container';

const navigation = [
  { name: 'Now Showing', route: '/' },
  { name: 'On DVD', route: '/ondvd' },
  { name: 'Favourites', route: '/favourites' },
]

export default function Header() {



  return (
    <header className="flex items-center justify-between py-1 px-2 md:py-3 md:px-4 border-b">
      <Container>
          <h1 className="text-xl font-bold">Movies</h1>
          <nav className="flex items-center space-x-2 lg:space-x-4">
            {navigation.map((item, index) => {
              return (
                <Link key={index} to={item.route} className={buttonVariants({ variant: "outline" })}>{item.name}</Link>
              )
            })}
          </nav>
          <ModeToggle></ModeToggle>
      </Container>
    </header>
  )
}

{/* <p className="grow">Movies</p>
        <div className="flex gap-x-2">
          
        </div> */}