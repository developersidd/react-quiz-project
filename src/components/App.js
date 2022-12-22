import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import "../styles/App.css";
import Layout from "./Layout/Layout";
import NotFound from "./NotFound";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Signup from "./Pages/Signup";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <HelmetProvider>

    <AuthProvider>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/*  private route starts */}
              <Route path="/*" element={<PrivateRoute />}>
                <Route path="quiz/:videoID" element={<Quiz />} />
                <Route path="result/:videoID" element={<Result />} />
              </Route>
              {/*  private route ends */}              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;