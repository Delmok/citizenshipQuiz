import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import questions from '../../questions.json'
import path from 'path';
type ResponseData = {
  message: string
}

export async function POST(req: { json: () => any; }, ctx: { params: any; }){

    let data = await req.json();
    let { params } = ctx;
    console.log(data, params)
    let tempArray: ({ id: string; question: string; choices: string[]; explanation: string; answer?: undefined; } | { id: string; question: string; choices: string[]; explanation: string; answer: string; })[] = [];
    questions.forEach(e => {
        tempArray.push(e)
    });
    


    tempArray[params.writeId].answer = data.answer;
    console.log(tempArray[params.writeId])

    fs.writeFile(path.join(process.cwd(), 'src/app/api/questions.json'),  JSON.stringify(tempArray, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

    return NextResponse.json({hello: 1})
}