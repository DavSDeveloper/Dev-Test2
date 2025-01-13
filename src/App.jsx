import { ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import apolloClient from "./utils/apolloClient";
import PublicRoute from "./utils/PublicRoute";
import Login from "./pages/Login/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Companies from "./pages/Companies/Companies";
import CompanyPage from "./pages/CompanyPage/CompanyPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ApolloProvider client={apolloClient}>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/auth/login" element={<Login />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:companyId" element={<CompanyPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/auth/login" />} />
            </Routes>
          </ApolloProvider>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
