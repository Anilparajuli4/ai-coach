'use client'
import { generateQuiz } from '@/actions/interview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [showExplanation, setShowExplanation] = useState(false)

    const{
        loading:generatingQuiz,
        fn: generateQuizfn,
        data: quizData
    } = useFetch(generateQuiz)


    if(generatingQuiz){
        return <BarLoader className='mt-4' width={"100%"} color="gray"/>
    }

  useEffect(()=>{
  if(quizData){
    setAnswers(new Array(quizData.lenght).fill(null))
  }
  },[])
    if(!quizData){
       return <Card className='mx-2'>
            <CardHeader>
                <CardTitle>Ready to test your knowleadge</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground'>
                    This quiz contains 10 questions specific to your industry and skills. Take your time and and choose the best answer for each question.
                </p>
            </CardContent>
            <CardFooter>
                <Button className='w-full ' onClick={generateQuizfn}>Start Quiz</Button>
            </CardFooter>
        </Card>
    }

    const question = quizData[currentQuestion]
  return (
    <div>
       <Card className='mx-2'>
            <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-font-medium'>
                   {question.question}
                </p>
                <RadioGroup className='space-y-2'>
                    {question.options.map((option, index)=> {
return <div className="flex items-center space-x-2" key={index}>
       <RadioGroupItem value={option} id={`option-${index}`} />
       <Label htmlFor={`option-${index}`}>{option}</Label>
        </div>
                    })}
 

</RadioGroup>

            </CardContent>
            <CardFooter>
             
            </CardFooter>
        </Card>
    </div> 
  )
}

export default Quiz