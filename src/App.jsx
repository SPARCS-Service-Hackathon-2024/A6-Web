import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/plant/register/image" element={<div />} />
            <Route path="/plant/register/type" element={<div />} />
            <Route path="/plant/register/nickname" element={<div />} />
            <Route path="/plant/register/start" element={<div />} />
            <Route path="/plant/register/watered" element={<div />} />
            <Route path="/plant/register/check" element={<div />} />
            <Route path="/plant/register/complete" element={<div />} />
        </Routes>
    );
}

export default App;
