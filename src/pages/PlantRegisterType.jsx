import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { useRecoilState } from "recoil";
import axios from "axios";
import 상추 from "../assets/상추.png";

function PlantRegisterType() {
    const [plantRegister, setPlantRegister] =
        useRecoilState(plantRegisterState);
    const navigate = useNavigate();
    const [plantTypes, setPlantTypes] = useState([]);
    const [selectedPlantType, setSelectedPlantType] = useState(null);

    useEffect(() => {
        // API 호출
        const fetchPlantTypes = async () => {
            try {
                const response = await axios.get(
                    "http://54.180.204.64/plant/type"
                );
                setPlantTypes(response.data.data); // API 응답에서 식물 타입 데이터를 저장
                // setPlantTypes([
                //     {
                //         id: 1,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                //     {
                //         id: 2,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                //     {
                //         id: 3,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },

                //     {
                //         id: 4,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                //     {
                //         id: 5,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                //     {
                //         id: 6,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                //     {
                //         id: 7,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                //     {
                //         id: 8,
                //         main_image:
                //             "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                //         created_at: "2024-02-14T09:10:37.651566",
                //         updated_at: "2024-02-14T09:10:37.655118",
                //         name: "상추",
                //         watering_cycle: 3,
                //         repotting_cycle: 14,
                //     },
                // ]);
            } catch (error) {
                console.error(
                    "식물 타입 데이터를 가져오는데 실패했습니다.",
                    error
                );
            }
        };

        fetchPlantTypes();
    }, []);

    const handleNextButtonClick = () => {
        navigate("/plant/register/nickname");
    };

    const handlePlantTypeClick = (id) => {
        setSelectedPlantType(id);
        setPlantRegister((prevState) => ({
            ...prevState,
            plant_type: id,
        }));
    };

    useEffect(() => {
        console.log(plantRegister);
    }, [plantRegister]);

    return (
        <div className="w-full h-screen-custom flex flex-col relative">
            <div className=" mt-3 ml-4 text-[22px]">
                해당 작물에 대해 더 알려주세요!
            </div>
            <div className="px-5 py-5">
                <label className="input input-bordered border-none rounded-full  h-[40px] flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="작물 검색"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>
            <div className="flex-grow overflow-y-auto px-4 py-5">
                <div className="grid grid-cols-3 gap-1">
                    {plantTypes.map((plant, index) => (
                        <div
                            key={index}
                            className={`flex flex-col justify-center items-center rounded-2xl bg-white w-[114px] h-[136px] mx-auto ${
                                selectedPlantType === plant.id
                                    ? "border-2 border-[#1AA873] bg-[#7FBA7633]"
                                    : ""
                            }`}
                            onClick={() => handlePlantTypeClick(plant.id)}
                        >
                            <img
                                src={상추}
                                alt="preview"
                                className="w-[100px] h-[100px] object-cover rounded-2xl"
                            />
                            <div className="flex justify-center">
                                {plant.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="btn rounded-2xl border-none bg-[#7FBA76] text-white text-[22px] w-[363px] h-[54px] fixed bottom-10 left-1/2 transform -translate-x-1/2"
                onClick={handleNextButtonClick}
            >
                다음으로
            </button>
        </div>
    );
}

export default PlantRegisterType;
