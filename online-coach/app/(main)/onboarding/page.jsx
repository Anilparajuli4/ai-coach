import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/OnboardingForm'
import { getUserOnboardingStatus, updateUser } from '@/actions/User'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'; // Add this line


async function Onboarding() {
    //check if user is already onboarded
   const {isOnboarded} = await getUserOnboardingStatus()

 


   if(isOnboarded){
    redirect("/dashboard")
   }
  return (
    <main>
        <OnboardingForm industries={industries}/>
    </main>
  )
}

export default Onboarding