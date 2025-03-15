'use client'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

function HeroSection() {
    const imageRef = useRef(null)

    useEffect(()=>{
        const imageElement = imageRef.current

        const handleScrolled = ()=>{
            const scrollPosition = window.scrollY
            const scrollThreshold = 100;
       
            if(scrollPosition > scrollThreshold){
              imageElement.classList.add("scrolled")
            }else{
                imageElement.classList.remove("scrolled")
            }
       
        }

        window.addEventListener('scroll', handleScrolled)
     return ()=> window.removeEventListener('scroll', handleScrolled)
    },[])
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
        <div className='space-y-6 text-center'>
            <div className='space-y-6 mx-auto'>
                <h1 className='gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl"'>Your Ai Carrer Coach for <br/>Professional Success</h1>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                    Advance your carrer with personalized guidance, interview prep, and AI-powered tools for job success
                </p>
            </div>
            <div className='flex justify-center space-x-4'>
                <Link href='/dashboard'>
                <Button size='lg' className='px-8'>
                    Get started
                </Button>
                </Link>
                <Link href='/www.youtube.com'>
                <Button size='lg' className='px-8' variant='outline'>
                    Get started
                </Button>
                </Link>
            </div>
            <div className='hero-image-wrapper mt-5 md:mt-0'> 
                <div ref={imageRef} className='hero-image'>
                    <Image src='/banner.jpg' width='1280' height={720} alt='Banner Sensai' className='rounded-lg shadow-2xl border mx-auto' priority/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection