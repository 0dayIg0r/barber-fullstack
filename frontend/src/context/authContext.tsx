import { createContext, ReactNode, useState } from "react"

interface AuthContextData{
    user: UserProps
    isAuthenticated: boolean
}

interface SubscriptionsProps{
    id: string,
    status: string
}

interface UserProps{
    id: string
    name: string
    email: string
    address: string | null
    subscriptions?: SubscriptionsProps | null
}

type AuthProviderProps ={
    children:ReactNode
}

export const AuthContext = createContext({ } as AuthContextData)


export function authProvider({children}:AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated   = !!user
    return(
        <AuthContext.Provider value={{user, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}