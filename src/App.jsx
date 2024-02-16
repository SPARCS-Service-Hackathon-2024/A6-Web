import { Route, Routes } from "react-router-dom";
import PlantRegisterImage from "./pages/PlantRegisterImage";
import { useEffect } from "react";
import PlantRegisterType from "./pages/PlantRegisterType";
import PlantRegisterNickname from "./pages/PlantRegisterNickname";
import PlantRegisterStart from "./pages/PlantRegisterStart";
import PlantRegisterWatered from "./pages/PlantRegisterWatered";
import PlantRegisterRepotted from "./pages/PlantRegisterRepotted";
import PlantRegisterCheck from "./pages/PlantRegisterCheck";
import PlantRegisterComplete from "./pages/PlantRegisterComplete";
import PlantDetail from "./pages/PlantDetail";
import PostRegister from "./pages/PostRegister";

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
                    <Route path="start" element={<PlantRegisterStart />} />
                    <Route path="watered" element={<PlantRegisterWatered />} />
                    <Route
                        path="repotted"
                        element={<PlantRegisterRepotted />}
                    />
                    <Route path="check" element={<PlantRegisterCheck />} />
                    <Route
                        path="complete"
                        element={<PlantRegisterComplete />}
                    />
                </Route>
                <Route path="/plant/detail/:id" element={<PlantDetail />} />
            </Routes>
        </div>
    );
}

export default App;
