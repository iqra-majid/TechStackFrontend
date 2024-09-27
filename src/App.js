import Signup from "./components/Signup";
import Login from "./components/Login";
import DrawerAppBar from "./components/Navbar";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import ProfileForm from "./components/ProfileForm";
import ".//styles/app.css";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  const handleApplyFilters = (filteredProfiles) => {
    console.log("Filtered profiles received from Sidebar:", filteredProfiles);
    setData(filteredProfiles); // Update profiles with filtered data
  };

  const fetchAllProfiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllProfiles"
      );

      console.log(response.data);
      setData(response.data); // Set initial profiles when app loads
    } catch (error) {
      console.error("Error fetching all profiles:", error);
    }
  };

  // Fetch all profiles on component mount
  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const location = useLocation();
  return (
    <div style={{ backgroundColor: "#f6f6fc", minHeight: "100vh" }}>
      <DrawerAppBar />
      <div className="app-container" style={{ display: "flex" }}>
        {/* Show Sidebar only if the pathname is "/" */}
        {location.pathname === "/" && (
          <Sidebar onApplyFilters={handleApplyFilters} />
        )}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home profiles={data} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileForm" element={<ProfileForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
