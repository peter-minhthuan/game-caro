
import React from 'react'

export const Button = React.memo(({ num, incre }) => {
   console.log('renderred')
   return (
      <button onClick={() => incre(num ? num : 10)}>
         Incre {num}
      </button>
   )
});