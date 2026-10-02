'use client';

export default function JSS2DebateLesson({onExercise}:{onExercise?:()=>void}){
  return <section className="fractions-premium-lesson">
    <header className="premium-lesson-hero"><p className="lesson-kicker">JSS2 English Studies · Listening and Speaking</p><h1>Debate</h1></header>
    {onExercise&&<button type="button" className="primary" onClick={onExercise}>Continue to AVORA exercise mode →</button>}
  </section>;
}
