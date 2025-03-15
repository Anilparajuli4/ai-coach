"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })


export async function generateQuiz (){
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
            
        
        const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
  const result = await model.generateContent(prompt)
  const response = result.response;
  const text = response.text() 
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

const quiz = JSON.parse(cleanedText)
return quiz.questions
} catch (error) {
        console.log("Error generating quiz:", error);  
        throw new Error("Failed to generate quiz questions")  
}
 
}

export async function saveQuizResult (questions, answers, score){
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
const questionResults = questions.map((q, index)=> ({
    question:q.question,
    answer:q.correctAnswer,
    userAnswer:answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,


}));

const wrongAnswers = questionResults.filter((q)=> !q.isCorrect)

if(wrongAnswers.lenght > 0){
  const wrongQuestionsText = wrongAnswers.map((q)=> `Questions: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`).
  join("\n\n");

  const improvementPrompt = `The user got the following ${user.industry} technical interview questions wrong: ${wrongQuestionsText}
  
  Based on these mistakes, provide aconcise, specific improvement tip. focus on the knowleadge gaps revelead by these wrong answers.
  keep the response under 2 sentences and make it encourging, Don't explicity mention the mistakes, instead focus on what to learn/practice
  `
try {
  const result = await model.generateContent(improvementPrompt)
  const response = result.response;
  improvementTip = response.text().trim()
 

} catch (error) {
  console.log("Error generating improvement tip:", error);
  
}
}
try {
  const assessment = await db.assessement.create({
    data:{
      userId: user.id,
      quizScore: score,
      questions: questionResults,
      category: "Technical",
      improvementTip
    }
  })
  return assessment
} catch (error) {
  throw new Error("Failed to save quiz result")
} 


}

