'use server'

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { generateAIInsights } from "./dashboard";



export async function updateUser(data) {
 
    
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
  
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("user does not exist");
    }
   
    try {
      const result = await db.$transaction(async (tx) => {
        // Find if the industryInsight exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });
  
        // If industryInsight does not exist, create it with default values
        if (!industryInsight) {
        //   industryInsight = await tx.industryInsight.create({
        //     data: {
        //       industry: data.industry,
        //       salaryRange: [],
        //       growthRate: 0,
        //       demandLevel: "MEDIUM", // Default value
        //       topSkills: [],
        //       marketOutlook: "NEUTRAL", // Default value
        //       keyTrends: [],
        //       recommendedSkills: [],
        //       nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        //     },
        //   });
        const insights = await generateAIInsights(data.industry)
           industryInsight = await db.industryInsight.create({
            data:{
                industry:data.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
          })
        }
  
        // Update the user
        const updateUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry, // Set the industry as string
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });
  
        return { updateUser, industryInsight };
      }, {
        timeout: 10000, // Default 5000
      });
  
      return { success: true, ...result };
    } catch (error) {
      console.error("Error updating user and industry:", error.message);
      throw new Error("Failed to update profile");
    }
  }
  





export async function getUserOnboardingStatus() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Single database call with proper error handling
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,  
      }
    });

    if (!user) throw new Error("User not found");

    return {
      isOnboarded: !!user.industry 
    };

  } catch (error) {
    console.error("Onboarding check failed:", error);
    throw new Error("Authentication verification failed");
  }
}