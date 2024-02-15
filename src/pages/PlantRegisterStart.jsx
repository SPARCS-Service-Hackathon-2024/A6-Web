import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { useRecoilState } from "recoil";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function PlantRegisterStart() {
    const [plantRegister, setPlantRegister] =
        useRecoilState(plantRegisterState);
    const navigate = useNavigate();
    const [plantStart, setPlantStart] = useState(new Date());

    useEffect(() => {
        console.log(plantRegister);
    }, [plantRegister]);

    const handleNextButtonClick = () => {
        const formattedDate = plantStart.toISOString().split("T")[0];

        setPlantRegister((prevState) => ({
            ...prevState,
            start_at: formattedDate,
        }));
        navigate("/plant/register/watered");
    };

    const date = plantStart;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}년 ${month}월 ${day}일`;

    return (
        <>
            <style>
                {`
                    .react-calendar {
                        background: transparent !important;
                        border: none !important;
                        // width: 100% !important;
                    }
                    .react-calendar__tile {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: auto;
                    }
                    .react-calendar__tile--active,
                    .react-calendar__tile--active:enabled:hover,
                    .react-calendar__tile--active:enabled:focus {
                        background: #7FBA76 !important;
                        color: white !important;
                        border-radius: 50% !important;

                    }
                    .react-calendar__month-view__weekdays__weekday abbr {
                        text-decoration: none;
                    }
                    
                   
                `}
            </style>{" "}
            <div className="w-full h-screen-custom flex flex-col relative">
                <div className=" mt-3 ml-4 text-[22px]">
                    언제부터 키우기 시작하셨나요?
                </div>
                <div className="flex justify-center rounded-full bg-white mx-5 mt-3 h-[30px] text-[16px]">
                    {formattedDate}
                </div>
                <div className="h-full flex flex-col justify-center items-center pb-24">
                    <Calendar
                        onChange={setPlantStart}
                        value={plantStart}
                        formatDay={(locale, date) =>
                            date.toLocaleString("en", { day: "numeric" })
                        }
                    />
                </div>
                <div className="px-4 pb-4 fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2">
                    <button
                        className="btn rounded-2xl border-none bg-[#7FBA76] text-white text-[22px] font-medium w-full max-w-[363px] h-[54px]"
                        onClick={handleNextButtonClick}
                    >
                        다음으로
                    </button>
                </div>
            </div>
        </>
    );
}

export default PlantRegisterStart;
