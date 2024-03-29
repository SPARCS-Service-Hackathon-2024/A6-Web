import { useRecoilState } from "recoil";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { farmInfoState } from "../recoil/atoms/farmInfoState";
function PlantCard() {
    const [farmInfo] = useRecoilState(farmInfoState);
    const [plantRegister] = useRecoilState(plantRegisterState);

    const calculateDaysSinceStart = (startAt) => {
        const startDate = new Date(startAt);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const differenceInTime = today.getTime() - startDate.getTime();
        const differenceInDays = Math.floor(
            differenceInTime / (1000 * 3600 * 24)
        );

        if (differenceInDays === 0) {
            return "오늘";
        } else {
            return `${differenceInDays}`;
        }
    };

    return (
        <div className="w-full h-[120px] p-[12px]  bg-white rounded-2xl flex">
            <img
                src={plantRegister.main_image_url}
                className="w-[80px] h-[80px] object-cover rounded-2xl mr-2"
            />
            <div className="flex flex-col">
                <div className="flex">
                    {" "}
                    <div className=" font-semibold text-base mr-2">
                        {plantRegister.nickname}
                    </div>
                    <div className=" font-normal text-base text-[#A3A3A3]">
                        {plantRegister.plant_type_name}
                    </div>
                </div>{" "}
                <div className=" text-base text-primaryTextColor">
                    키운지 {calculateDaysSinceStart(farmInfo.start_at)}일 째
                </div>
                <div className="flex gap-1 mt-5">
                    {" "}
                    <div className="rounded-full text-[8px] px-2 py-1 flex items-center text-[#3C82D3] bg-[#3C82D333]">
                        {calculateDaysSinceStart(farmInfo.last_watered_at)}일 전
                        물 줌
                    </div>
                    <div className="rounded-full text-[8px] px-2 py-1 flex items-center text-[#FFB23E] bg-[#FFB23E33]">
                        {calculateDaysSinceStart(farmInfo.last_repotted_at)} 일
                        전 분갈이 함
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlantCard;
