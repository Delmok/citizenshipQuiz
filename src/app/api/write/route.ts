import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import questions from '../questions.json'
import { useSearchParams } from 'next/navigation'
type ResponseData = {
  message: string
}
 
export async function GET(req, ctx){

    let params = useSearchParams()
    console.log(params);
    
    let tempArray = [];
    questions.forEach(e => {
        tempArray.push(e)
    });
    
    //let questionIndex = tempArray.findIndex(x => x.question === tempData.question)

    //tempArray[questionIndex].answer = playersChoice;
    //console.log(tempArray[questionIndex])
    //fs.writeFileSync('./api/questions.json', JSON.stringify(tempArray, null, 4));


    return NextResponse.json({hello: 1})
}