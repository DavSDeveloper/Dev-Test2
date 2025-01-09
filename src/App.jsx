import { ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import apolloClient from "./utils/apolloClient";
import Login from "./pages/Login/Login";
import Companies from "./pages/Companies/Companies";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ApolloProvider client={apolloClient}>
            <Routes>
              <Route path="/auth/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/companies" element={<Companies />} />
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
