import {
    createContext,
    useContext,
    useState
} from 'react'

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setToken: () => {},
    logoutUser: () => {}
});
  
export const ContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [currentUser, setCurrentUser] = useState({})

    const setToken = token => {
      if (token) localStorage.setItem('TOKEN', token)
      else localStorage.removeItem('TOKEN')
    
      setUserToken(token);
    }
  
    const logoutUser = () => {
      localStorage.removeItem('TOKEN');
      setUserToken('');  
    }

    return (
      <StateContext.Provider
        value={{   
          currentUser,
          setCurrentUser,
          userToken,
          logoutUser,
          setToken,
        }}
      >
        {children}
      </StateContext.Provider>
    );
  };
  
  export const getContext = () => useContext(StateContext);