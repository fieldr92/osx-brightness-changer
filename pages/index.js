import { useEffect, useState } from 'react';

export default function Home() {
  const [level, setLevel] = useState("loading...");

  useEffect(() => {
    getBrightness()
  }, [])

  const getBrightness = async () => {
    const brightness = await fetch('get-brightness');
    setLevel(await brightness.text());
  }

  const increaseBrightness = async () => {
    const newLevel = await fetch('/add');
    setLevel(await newLevel.text());
  };

  const decreaseBrightness = async () => {
    const newLevel = await fetch('/minus');
    setLevel(await newLevel.text());
  }

  return (
    <>
      <button onClick={increaseBrightness}>
        PLUS
      </button>
      <button onClick={decreaseBrightness}>
        MINUS
      </button>
      <h1>Brightness level:<br/>{level}</h1>
    </>
  )
}
