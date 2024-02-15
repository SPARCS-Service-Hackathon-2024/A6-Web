import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { useRecoilState, useResetRecoilState } from "recoil";
import "react-calendar/dist/Calendar.css";
import PlantCard from "../components/PlantCard";
import axios from "axios";

function PlantRegisterCheck() {
    const [plantRegister] = useRecoilState(plantRegisterState);
    const navigate = useNavigate();
    const resetPlantRegisterState = useResetRecoilState(plantRegisterState);

    useEffect(() => {
        console.log(plantRegister);
    }, [plantRegister]);

    const handleResetButtonClick = () => {
        resetPlantRegisterState;
        navigate("/plant/register/image");
    };

    const handleNextButtonClick = async () => {
        const formData = new FormData();
        formData.append("main_image", plantRegister.main_image);
        formData.append("plant_type", plantRegister.plant_type);
        formData.append("nickname", plantRegister.nickname);
        formData.append("start_at", plantRegister.start_at);
        formData.append("watered_at", plantRegister.watered_at);
        formData.append("repotted_at", plantRegister.repotted_at);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {
            const response = await axios.post(
                "https://trothly.com/plant/",

                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${plantRegister.access_token}`,
                    },
                }
            );
            console.log(response.data);
            navigate("/plant/register/complete");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-screen-custom pt-3 px-4 flex flex-col relative">
            <div className="text-[22px] mb-3">이렇게 등록할게요!</div>
            <PlantCard />
            <div className="px-4 pb-4 fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2">
                <button
                    className="btn rounded-2xl border-none bg-transparent text-primaryTextColor text-[22px] font-medium w-full max-w-[363px] h-[54px]"
                    onClick={handleResetButtonClick}
                >
                    처음부터 다시 할래요
                </button>
                <button
                    className="btn rounded-2xl border-none bg-[#7FBA76] text-white text-[22px] font-medium w-full max-w-[363px] h-[54px]"
                    onClick={handleNextButtonClick}
                >
                    등록하기
                </button>
            </div>
        </div>
    );
}

export default PlantRegisterCheck;
