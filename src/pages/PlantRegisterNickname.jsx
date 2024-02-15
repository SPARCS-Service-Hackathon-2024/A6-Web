import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";

function PlantRegisterNickname() {
    const navigate = useNavigate();
    const [plantNickname, setPlantNickname] = useState("");
    const [plantRegister, setPlantRegister] =
        useRecoilState(plantRegisterState);

    const handleNextButtonClick = () => {
        setPlantRegister((prevState) => ({
            ...prevState,
            nickname: plantNickname,
        }));
        navigate("/plant/register/start");
    };

    const handlePassButtonClick = () => {
        navigate("/plant/register/start");
    };

    const handleInputChange = (e) => {
        if (e.target.value.length <= 30) {
            setPlantNickname(e.target.value);
        }
    };

    useEffect(() => {
        console.log(plantRegister);
    }, [plantRegister]);

    return (
        <div className="w-full h-screen-custom flex flex-col relative">
            <div className=" mt-3 ml-4 text-[22px]">
                혹시 애칭이 있으실까요?
            </div>
            <div className="px-5 py-5 flex flex-col">
                <input
                    type="text"
                    placeholder="작물 애칭"
                    className="input w-full max-w-lg rounded-full"
                    value={plantNickname}
                    onChange={handleInputChange}
                />
                <div className="text-right mt-2">{`${plantNickname.length}/30`}</div>
            </div>

            <div className="px-4 pb-4 fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2">
                <button
                    className="btn rounded-2xl border-none bg-transparent text-primaryTextColor text-[22px] font-medium w-full max-w-[363px] h-[54px]"
                    onClick={handlePassButtonClick}
                >
                    건너뛰기
                </button>
                <button
                    className={`btn rounded-2xl border-none text-[22px] font-medium w-full max-w-[363px] h-[54px] ${
                        plantNickname
                            ? "bg-[#7FBA76] text-white"
                            : "bg-[#A3A3A3]"
                    }`}
                    onClick={plantNickname ? handleNextButtonClick : undefined}
                    disabled={!plantNickname}
                >
                    다음으로
                </button>
            </div>
        </div>
    );
}

export default PlantRegisterNickname;
