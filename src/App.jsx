import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SessionContext from "contexts/SessionContext";
import PlantListPage from "pages/PlantListPage";
import PlantShowPage from "pages/PlantShowPage";
import * as LocalStorageService from "services/localStorage";
import ScrollToTop from "shared-components/ScollToTop";

const App = () => {
  const [sessionToken, setSessionToken] = useState(() =>
    LocalStorageService.getSessionTokenStorage()
  );

  return (
    <SessionContext.Provider value={{
      username: sessionToken ? jwtDecode(sessionToken).username : null,
      signIn: (token) => {
        setSessionToken(token);
        LocalStorageService.setSessionTokenStorage(token)
      },
      signOut: () => {
        setSessionToken(null);
        LocalStorageService.removeSessionTokenStorage();
      }
    }}>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/plants" element={<PlantListPage />} />
        <Route path="/plants/:plantId" element={<PlantShowPage />} />
      </Routes>
    </BrowserRouter>
    </SessionContext.Provider>
  );
};

export default App;
