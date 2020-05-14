
import React, { useState, useCallback } from 'react'
import { Button } from './components/Button';

const App = () => {
   const [count, setCount] = useState(0);
   const numbers = [100, 200, -150];

   const incre = useCallback((n) => {
      setCount(preCount => preCount + n);
   },
      [setCount],
   );

   return (
      <div>
         <h1>Count: {count}</h1>

         <Button incre={incre} />
         <br />

         {
            numbers.map((num, index) => (
               <Button incre={incre} num={num} />
            ))
         }
      </div>
   )
}
export default App