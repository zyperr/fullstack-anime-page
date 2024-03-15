import React from 'react'
import { useState } from 'react';
export const Context = React.createContext({})
function Provider({children}) {

  const [tap, setTap] = useState("animes");

  return (
    <Context.Provider value={{tap, setTap}}>
      {children}
    </Context.Provider> 
  )
}

export {Provider}