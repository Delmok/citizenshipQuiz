import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import questions from '../../questions.json'
import path from 'path';
type ResponseData = {
  message: string
}
 
export async function POST(req, ctx){

    let data = await req.json();
    let { params } = ctx;
    console.log(data, params)
    let tempArray = [];
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
    //fs.writeFileSync('../../questions.json', JSON.stringify(tempArray, null, 4));


    return NextResponse.json({hello: 1})
}