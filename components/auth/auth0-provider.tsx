import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// import { createAuth0Client } from '@auth0/auth0-spa-js';
// import type { Auth0Client, RedirectLoginOptions, GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';

// type Auth0ContextType = {
//   isAuthenticated: boolean;
//   user: any;
//   isLoading: boolean;
//   loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
//   logout: () => void;
//   getAccessToken: (options?: GetTokenSilentlyOptions) => Promise<string | undefined>;
// };

// const Auth0Context = createContext<Auth0ContextType | null>(null);

// export const useAuth0 = () => {
//   const context = useContext(Auth0Context);
//   if (!context) {
//     throw new Error('useAuth0 must be used within an Auth0Provider');
//   }
//   return context;
// };

interface Auth0ProviderProps {
  children: ReactNode;
  domain: string;
  clientId: string;
  redirectUri: string;
}

export function Auth0Provider({
  children,
  domain,
  clientId,
  redirectUri,
}: Auth0ProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  // const [auth0Client, setAuth0Client] = useState<Auth0Client | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth0 = async () => {
      try {
        // const auth0 = await createAuth0Client({
        //   domain,
        //   clientId,
        //   authorizationParams: {
        //     redirect_uri: redirectUri,
        //   },
        //   cacheLocation: 'localstorage'
        // });

        // Handle redirect callback if code is present in URL
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // await auth0.handleRedirectCallback();
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        // Check if user is authenticated
        // const isAuthenticated = await auth0Client.isAuthenticated();
        // setIsAuthenticated(isAuthenticated);

        // Get user data if authenticated
        // if (isAuthenticated) {
        //   const userProfile = await auth0Client.getUser();
        //   setUser(userProfile);
        // }
      } catch (error) {
        console.error("Error initializing Auth0:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth0();
  }, [domain, clientId, redirectUri]);

  // const loginWithRedirect = async (options?: RedirectLoginOptions) => {
  //   if (!auth0Client) return;
  //   await auth0Client.loginWithRedirect(options);
  // };

  const logout = () => {
    // if (!auth0Client) return;
    // auth0Client.logout({
    //   logoutParams: {
    //     returnTo: window.location.origin
    //   }
    // });
  };

  // const getAccessToken = async (options?: GetTokenSilentlyOptions) => {
  //   if (!auth0Client) return;
  //   try {
  //     return await auth0Client.getTokenSilently(options);
  //   } catch (e) {
  //     console.error('Error getting access token:', e);
  //     return undefined;
  //   }
  // };

  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    // loginWithRedirect,
    logout,
    // getAccessToken,
  };

  // return (
  //   <Auth0Context.Provider value={contextValue}>
  //     {children}
  //   </Auth0Context.Provider>
  // );
}
