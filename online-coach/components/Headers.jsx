import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, FileTextIcon, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { checkUser } from '@/lib/checkUser'

async function Headers() {
  await checkUser();
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
        <nav className='h-16 container mx-auto px-4 h-16 flex items-center justify-between'>
          <div>
          <Link href='/'>
            logo
            </Link>
          </div>
           
            <div className='flex items-center space-x-2 md:space-x-4'>
              <SignedIn>
                    <Link href={'/dashboard'}>
                    <Button variant='outline'>
                        <LayoutDashboard className='h-4 w-4'/>
                        <span className=' text-2xl'>Industry Insight</span>
                    </Button>
                    </Link>

                    <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button>
                        <StarsIcon className='h-4 w-4'/>
                        <span className=' text-2xl'>Growth Tools</span>
                        <ChevronDown className='h-4 w-4' />
                    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>

    <DropdownMenuItem>
        <Link href={'/resume'} className='flex items-center gap-2'>
        <FileTextIcon className='h-4 w-4'/>
                        <span className=' text-2xl'>Build Resume</span>
                        <ChevronDown className='h-4 w-4' />
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
         <Link href={'/ai-cover-letter'} className='flex items-center gap-2'>
        <PenBox className='h-4 w-4'/>
                        <span className=' text-2xl'>Cover Letter</span>
                        <ChevronDown className='h-4 w-4' />
        </Link>
        </DropdownMenuItem>
    <DropdownMenuItem> 4
        <Link href={'/interview'} className='flex items-center gap-2'>
        <GraduationCap className='h-4 w-4'/>
                        <span className=' text-2xl'>Interview Prep</span>
                        <ChevronDown className='h-4 w-4' />
        </Link>
        </DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
</SignedIn>
              
            </div>
        
        </nav>
    <div className="">
          <SignedOut>
              <SignInButton>
                <Button variant='outline'>Sign In</Button>
              </SignInButton>
               
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton
              appearance={{
                elements:{
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold"
                }
              }}
              afterSignOutUrl='/'
              />
            </SignedIn>
    </div>
    </header>
  )
}

export default Headers