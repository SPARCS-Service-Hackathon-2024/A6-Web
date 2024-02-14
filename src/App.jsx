import { Route, Routes } from "react-router-dom";
import PlantRegisterImage from "./pages/PlantRegisterImage";
import { useEffect } from "react";
import PlantRegisterType from "./pages/PlantRegisterType";
import PlantRegisterNickname from "./pages/PlantRegisterNickname";

function App() {
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });

    return (
        <div>
            <Routes>
                <Route path="/plant/register">
                    <Route path="image" element={<PlantRegisterImage />} />
                    <Route path="type" element={<PlantRegisterType />} />
                    <Route
                        path="nickname"
                        element={<PlantRegisterNickname />}
                    />
                    <Route path="start" element={<div>Start Date</div>} />
                    <Route path="watered" element={<div>Last Watered</div>} />
                    <Route path="check" element={<div>Check Info</div>} />
                    <Route
                        path="complete"
                        element={<div>Registration Complete</div>}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
