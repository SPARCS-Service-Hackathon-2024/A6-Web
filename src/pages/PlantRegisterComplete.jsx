import "react-calendar/dist/Calendar.css";
import PlantCard from "../components/PlantCard";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { useRecoilState } from "recoil";

function PlantRegisterComplete() {
    const [plantRegister] = useRecoilState(plantRegisterState);

    return (
        <div className="w-full h-screen-custom pt-3 px-4 flex flex-col justify-center items-center">
            <div className=" text-primaryTextColor text-xl mb-10 animate-jump-up">
                {plantRegister.nickname} 등록 완료!
            </div>
            <PlantCard />
        </div>
    );
}

export default PlantRegisterComplete;
