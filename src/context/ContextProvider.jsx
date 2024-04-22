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
});
  
export const ContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [currentUser, setCurrentUser] = useState({});

    const setToken = token => {
      if (token) localStorage.setItem('TOKEN', token);
      else localStorage.removeItem('TOKEN');
    
      setUserToken(token);
    }
  
    return (
      <StateContext.Provider
        value={{   
          currentUser,
          setCurrentUser,
          userToken,
          setToken,
        }}
      >
        {children}
      </StateContext.Provider>
    );
  };
  
  export const getContext = () => useContext(StateContext);