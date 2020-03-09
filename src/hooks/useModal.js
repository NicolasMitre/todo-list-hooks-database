import { useState } from 'react'

export const useModal = ( initialMode = false ) => {
  const [isOpened, setIsOpened] = useState(false)
  const toogle = () => setIsOpened( !isOpened )
  return [ isOpened, setIsOpened, toogle ]
}

export default useModal