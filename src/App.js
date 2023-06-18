import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Events from "./pages/events";
import AddEvent from "./pages/addevent";
import EditEvent from "./pages/editevent";
import EditUser from "./pages/edituser";
import Login from "./pages/login";
import Register from "./pages/register";
import Hello from "./pages/hello";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
        <Route path="/dashboard/events" element={<Events />} />
        <Route path="/dashboard/events/add" element={<AddEvent />} />
        <Route path="/dashboard/events/edit/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
