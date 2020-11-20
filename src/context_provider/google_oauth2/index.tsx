import React, { useState, useEffect, createContext, useContext } from 'react'
import GoogleOAuth2ContextType from '../../types/context_provider/GoogleOAuth2ContextType'
import GoogleOAuth2Service from '../../services/auth/google/GoogleOAuth2Service'

const GoogleOAuth2Context = createContext({
  client: undefined,
} as GoogleOAuth2ContextType)

const GoogleOAuth2ContextProvider: React.FC = (props) => {
  const [context, setContext] = useState<GoogleOAuth2ContextType>({
    client: undefined,
    updateClient: (auth: any) => {}
  })

  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    let handleUpdate = (auth2: any) => {
      setContext({
        client: auth2,
        updateClient: handleUpdate
      })
    }

    const init = () => {
      GoogleOAuth2Service.initClient(handleUpdate)
    }

    if (firstLoad) {
      init()
      setFirstLoad(false)
    }

    const cleanBeforeUpdate = () => {
      handleUpdate = () => {}
    }

    return cleanBeforeUpdate
  }, [context, firstLoad])

  return (
    <GoogleOAuth2Context.Provider value={context}>
      {props.children}
    </GoogleOAuth2Context.Provider>
  )
}

export const useGoogleOAuth2 = () => useContext(GoogleOAuth2Context)

export default GoogleOAuth2ContextProvider
