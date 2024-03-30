"use client"
/* eslint-disable */
import Image from "next/image";
import * as React from 'react';
import questions from './api/questions.json'
import { GoogleTagManager } from '@next/third-parties/google';

export default function Home() {

  const [answeredQuestions, setAnsweredQuestions] = React.useState([9000]);
  const [score, setScore] = React.useState(0);
  const [life, setLife] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);
  const [roundOver, setRoundOver] = React.useState(false);
  const [playersChoice, setPlayersChoice] = React.useState(null);
  const [tempData, setTempData] = React.useState(getUnAnsweredQuestion());


  const getQuestion = async () => {
    if (gameOver){
        setLife(3);
        setScore(0);
        setGameOver(!gameOver);
    }
    try {
        setPlayersChoice(null)
        setTempData(getUnAnsweredQuestion())
        setRoundOver(false);
        let tempArray: ({ id: string; question: string; choices: string[]; explanation: string; answer?: undefined; } | { id: string; question: string; choices: string[]; explanation: string; answer: string; })[] = [];
        questions.forEach(e => {
            tempArray.push(e)
        });
    } catch (error) {
      //
      //console.log(error)
    }
  }

  function getUnAnsweredQuestion(){
    let randomQuestionID = getRandomInt(questions.length);
    let question = questions[randomQuestionID];

    question.choices = question.choices
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return question;

    
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function handleClick(answer: any ,type=null) {
    if (gameOver) return;
    setPlayersChoice(answer);
    // eslint-disable-next-line no-use-before-define
    if (answer == tempData.answer){ // eslint-disable-next-line no-use-before-define
      setScore(score + 1);
    }else{
      if (life == 1) setGameOver(!gameOver);
      setLife(life - 1)
    }
    setRoundOver(true)
  }

  return (
    <>

      <div className="grid pt-10 p-4">
        <div className="m-auto grid gap-8 min-w-full bg-blue-300 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="-translate-y-2 -translate-x-2 shadow-inner bg-slate-600 rounded-3xl border border-slate-500 border-dashed showdow-inner ">
            <div className="grid">
              <div className="grid p-4 text-center -translate-y-2 ">
                <div className="relative flex items justify-center items-center"> 
                  <div className="animate-ping absolute font-extrabold opacity-75" key={score}>{score}</div>
                  <div className="relative font-extrabold">{score}</div>
                </div> 
                <div className="flex items-center justify-center">
                  <Image className="" src={life > 0 ? "/heart.png" : "/heartoutline.png"} alt="heart" width="32" height="32" />
                  <Image className="" src={life > 1 ? "/heart.png" : "/heartoutline.png"} alt="heart" width="32" height="32" />
                  <Image className="" src={life > 2 ? "/heart.png" : "/heartoutline.png"} alt="heart" width="32" height="32" />
                </div>
            </div>
            <div className="text-center p-4">{tempData.question}</div>
            <div className="grid gap-4 p-4 text-center">
             {
              tempData.choices.map((e)=> {

                return (
                <div key={e} className="relative px-6 py-3 font-bold text-black group" style={{opacity: !roundOver ? 1 :  tempData.explanation == e ? 1 : 0.2}} onClick={(v) => {!roundOver ? handleClick(e) : null}} >
                  <span className="absolute inset-0 w-full h-full transition rounded duration-300 ease-out transform group-hover:-translate-x-2 group-hover:-translate-y-2 bg-blue-300 translate-x-0 translate-y-0" style={{background: !roundOver ? 'null' : e == tempData.answer ? "green" : e == playersChoice ? "red" : 'null' }} ></span>
                  <span className="absolute inset-0 w-full h-full border-2 rounded border-black" ></span>
                  <span className="relative">{e}</span>
                </div>
                )
                })

            }
              </div>

              <div className="grid gap-2 p-4 text-center border-slate-500 items-center justify-center" style={{display: roundOver ? "grid" : "none"}}>
                <div className="relative px-6 py-3 font-bold text-black group"  onClick={getQuestion}>
                  <span className="absolute inset-0 w-full h-full transition rounded duration-300 ease-out transform group-hover:-translate-x-2 group-hover:-translate-y-2 bg-blue-300 translate-x-0 translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full border-2 rounded border-black"></span>
                  <span className="relative">{gameOver ? "NEW GAME" : "NEXT QUESTION"}</span>
                </div>
                <div className="font-bold">Explanation:</div>
                <div className="">{tempData.explanation}</div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </>
  );
}

