import { useState } from 'react'
import useModal from './useModal'

const useModalWithData = ( initialIsOpened = false, initialData = null ) => {

  const [ isModalOpened, setIsModalOpened] = useModal( initialIsOpened )
  const [ data, setData ] = useState( initialData )
  const customSetIsModalOpened = isModalOpened => {
    setIsModalOpened( isModalOpened )
    if ( isModalOpened === false )
      setData( null )
  }
  
  return [ customSetIsModalOpened, isModalOpened, data, setData ]

}

export default useModalWithData