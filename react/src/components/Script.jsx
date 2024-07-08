import React, { useState, useRef, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import nig from '../assets/Howtokeepyourselfrel_Trim.mp4'
import audio from '../assets/synthesized_audio.mp3'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Script = ({ index, onUpdate }) => {
  
  // first window
  // const text = "Welcome to the age of AI, where machines are taking over the world! But don't panic, we've got you covered. In this video, we'll share some hilarious and practical tips on how to survive your job in the times of AI.\n\nFirst things first, let's address the elephant in the room: robots are stealing our jobs! But fear not, because there are still some things that AI can't replicate. Like, have you ever seen a robot with a sense of humor? Okay, maybe they're not the best jokes, but you get the point. As humans, we have unique qualities like creativity, empathy, and critical thinking that AI just can't match.\n\nNow, onto some practical tips. First, upskill yourself in areas where AI can't replace you. Take courses in creative writing, design, or public speaking to stay ahead of the game. Second, embrace technology and learn how to use it to your advantage. Who knows, you might even become an AI whisperer and teach these robots a thing or two!\n\nSo, don't let the robots scare you. Keep learning, keep growing, and keep being the uniquely human being that you are. And if all else fails, we can always join the robot uprising (just kidding). Thanks for watching, and don't forget to hit that subscribe button for keeping up with the latest news!"
  const textareaRef = useRef(null);


  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState('');
  const [generated, setGenerated] = useState(false);

  const generateText = () => {
    console.log(title)
    fetch('http://localhost:8800/script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    })
    .then(res => res.json())
    .then(data => {
      setText(data.completion)
      console.log(text)
      
      const words = text.split(' ');
      textareaRef.current.className += ' py-4 border-2'

      setGenerated(true)
      
    })
  }

      useEffect(() => {
        if (text) {

          const words = text.split(' ');
          setResult(words[0]);
          let index = 0;
          const interval = setInterval(() => {
            setResult(prevResult => `${prevResult} ${words[index]}`);
            index++;
            if (index === words.length - 1) clearInterval(interval);
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }, Math.floor(Math.random() * 100) + 50);
          
        }
      }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);

    document.querySelector('.copy').innerHTML = 'Copied!'
  }
  ///////////////

  //second window
  const [result2, setResult2] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleCheck1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
  }

  const handleCheck2 = () => {
    setIsChecked2(true);
    setIsChecked1(false);
  }

  const generateVideo = () => {
    setLoading(true)

    const temp = "['Are you tired of feeling exhausted during football games?','Do you want to be able to run circles around your opponents without breaking a sweat?','Well, you\'re in luck!','In this video, we\'re going to share some tips and tricks that will help you build endurance and get the stamina you need to dominate on the field.','First things first, let\'s talk about why endurance is so important for football players.','Football is a high-intensity sport that requires a lot of running, jumping, and quick movements.','If you don\'t have the endurance to keep up with the demands of the game, you\'ll quickly find yourself struggling to keep up with your opponents.','In addition to helping you keep up with the pace of the game, building endurance can also help you recover faster between plays.','This means you\'ll be able to get back in the game faster and make more plays, which can ultimately lead to more wins for your team.']"
    fetch('http://localhost:8800/keyword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keywords: temp
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setLoading(false)
      document.querySelector('.video-raw').style.display = 'flex'
    })
    
    
  }
  /////////////////

  //third window
  const [result22, setResult22] = useState('');
  const [isChecked21, setIsChecked21] = useState(false);
  const [isChecked22, setIsChecked22] = useState(false);
  
  const [loading2, setLoading2] = useState(false);

  const handleCheck21 = () => {
    setIsChecked21(true);
    setIsChecked22(false);
  }

  const handleCheck22 = () => {
    setIsChecked22(true);
    setIsChecked21(false);
  }

  const generateSound = async () => {
    setLoading2(true)
    
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setLoading2(false)
    document.querySelector('.sound-raw').style.display = 'flex'
  }
  /////////////////




  return (
    <div className='justify-center w-[1500px] mt-10'>

      <div className={`${index === 1 ? 'flex' : 'hidden'} flex-col gap-8`}>
        <h2 className='text-3xl font-semibold text-gray-800'>Generate script for your Youtube Video <span className='text-2xl'>🔥</span></h2>

        <div className='w-full'>
          <input className='border-2 border-black rounded-lg w-[60%] h-[2.6rem] px-2 py-1 text-lg' placeholder='Enter Title' type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <span className='ml-5 border-2 border-blue-700 px-3 py-2 rounded-md text-blue-700 hover:bg-blue-300 hover:text-black hover:border-black font-medium duration-150 cursor-pointer shadow-[5px_4px_0px_0px_rgba(0,0,0,1)]' onClick={generateText}>Generate</span>
        </div>

        <textarea className='border-black rounded-lg w-[60%] h-0 overflow-hidden px-3' ref={textareaRef} onChange={e => setResult(e.target.value)} value={result}></textarea>

        <div className={`${generated ? 'flex justify-between' : 'hidden'} w-[70%]`}>
          <span className='h-[38px] copy px-2 py-2 border rounded-lg text-sm duration-100 text-yellow-600 border-yellow-600 hover:bg-yellow-50 cursor-pointer' onClick={handleCopy}>Copy</span>
          <span className='flex items-center gap-1 px-2 py-2 border rounded-lg text-sm duration-100 text-black border-black hover:bg-gray-600 hover:border-white hover:text-white cursor-pointer mb-10' onClick={() => onUpdate(2)}>Generate Video <AiOutlineArrowRight /></span>
        </div>
      </div>



      <div className={`${index === 2 ? 'block' : 'hidden'}`}>
        <h2 className='text-3xl font-semibold text-gray-800'>Generate Video using AI for your Youtube Channel <span className='text-5xl mt-2'>📽</span></h2>

        <div>
          <h3 className='mt-10'>Choose an option for the Script</h3><br />
          <label><input type="checkbox" checked={isChecked1} onChange={handleCheck1} /> Use AI Generated Script</label><br />
          <label><input type="checkbox" checked={isChecked2} onChange={handleCheck2} /> Use your own Script</label><br />

          <textarea className={`${isChecked2 ? 'block' : 'hidden'} border-2 border-black rounded-lg w-[60%] h-auto px-3 py-4 mt-5`} onChange={e => setResult2(e.target.value)} placeholder="Type your script or press 'CTRL' + 'v'." value={result2}></textarea><br />

          <span className='ml-auto border-2 border-blue-700 px-3 py-2 rounded-md text-blue-700 hover:bg-blue-300 hover:text-black hover:border-black font-medium duration-150 cursor-pointer shadow-[5px_4px_0px_0px_rgba(0,0,0,1)]' onClick={generateVideo}>Generate Video</span><br />
        </div>

        {loading && <div className='my-10'><LinearProgress /></div>}

        <div className='w-full flex-col items-center video-raw hidden mt-10'>
          <video height='750' controls muted className='video-f'>
            <source src={nig} type='video/mp4' />
          </video><br />

          <span className='flex items-center gap-1 px-2 py-2 border rounded-lg text-sm duration-100 text-black border-black hover:bg-gray-600 hover:border-white hover:text-white cursor-pointer mb-10' onClick={() => onUpdate(3)}>Generate Voiceover <AiOutlineArrowRight/></span>
        </div>
      </div>


      
      <div className={`${index === 3 ? 'block' : 'hidden'}`}>
        <h2 className='text-3xl font-semibold text-gray-800'>Generate AI Generated Voiceover 🔉</h2>

        <div>
          <h3 className='mt-10'>Choose an option for the Script</h3><br />
          <label><input type="checkbox" checked={isChecked21} onChange={handleCheck21} /> Use AI Generated Script</label><br />
          <label><input type="checkbox" checked={isChecked22} onChange={handleCheck22} /> Use your own Script</label><br />

          <textarea className={`${isChecked22 ? 'block' : 'hidden'} border-2 border-black rounded-lg w-[60%] h-auto px-3 py-4 mt-5`} onChange={e => setResult22(e.target.value)} placeholder="Type your script or press 'CTRL' + 'v'." value={result22}></textarea><br />

          <span className='ml-auto border-2 border-blue-700 px-3 py-2 rounded-md text-blue-700 hover:bg-blue-300 hover:text-black hover:border-black font-medium duration-150 cursor-pointer shadow-[5px_4px_0px_0px_rgba(0,0,0,1)]' onClick={generateSound}>Generate Voiceover</span><br />
        </div>

        {loading2 && <div className='my-10'><LinearProgress /></div>}

        <div className='w-full flex-col items-center sound-raw hidden mt-10'>
          <audio src={audio} controls></audio>
        </div>
      </div>

    </div>
  )
}

export default Script
