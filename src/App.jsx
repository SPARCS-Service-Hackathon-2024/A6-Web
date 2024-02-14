import { Route, Routes } from "react-router-dom";
import PlantRegisterImage from "./pages/PlantRegisterImage";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/plant/register">
                    <Route path="image" element={<PlantRegisterImage />} />
                    <Route path="type" element={<div>Plant Type</div>} />
                    <Route path="nickname" element={<div>Nickname</div>} />
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
