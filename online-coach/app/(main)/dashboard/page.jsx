import { getIndustryInsights } from '@/actions/dashboard'

import { redirect } from 'next/navigation'
import React from 'react'
import DashboardView from './_components/dashboard-view'
import { getUserOnboardingStatus } from '@/actions/User';
export const dynamic = 'force-dynamic'

async function IndustryInsightPages() {
  const { isOnboarded } = await getUserOnboardingStatus();
console.log(isOnboarded)
// const isOnboarded = false
  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    console.log('redirection is false')
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}

export default IndustryInsightPages