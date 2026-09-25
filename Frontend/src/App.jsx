import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/feed" replace />} />

                <Route path="/feed" element={<Feed />} />

                <Route path="/create-post" element={<CreatePost />} />

                <Route
                    path="*"
                    element={<Navigate to="/feed" replace />}
                />
            </Routes>
        </Router>
    );
};

export default App;