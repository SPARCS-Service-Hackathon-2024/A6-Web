import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { plantDetailState } from "../recoil/atoms/plantDetailState";
import { useLocation } from "react-router-dom";
import {
    FlowerSVG,
    HumiditySVG,
    SunlightSVG,
    TemperatureSVG,
    WaterSVG,
    renderSVG,
} from "./renderSVG";
import { calculateDaysSinceStart } from "./calculateDaysSinceStart";
import axios from "axios";
import { useEffect, useState } from "react";
import { getDaysUntilDeadline } from "./\bgetDaysUntilDeadline";
import Diary from "../components/Diary";
import Pride from "../components/Pride";
import { postDiaryState } from "../recoil/atoms/postDiaryState";
import { diaryModalState } from "../recoil/atoms/diaryModalState";

function PlantDetail() {
    const { id } = useParams();
    const BASE_URL = "https://trothly.com/";
    console.log(id);
    const [plantDetail, setPlantDetail] = useRecoilState(plantDetailState);
    const location = useLocation();
    const [showModal, setShowModal] = useRecoilState(diaryModalState);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [plantTypeInfo, setPlantTypeInfo] = useState(null);
    const [selectedDiaryType, setSelectedDiaryType] = useState("농업 일지");
    const [selectedLocation, setSelectedLocation] = useState("옥상");
    const [, setPostDiary] = useRecoilState(postDiaryState);

    useEffect(() => {
        setPostDiary((prevState) => ({
            ...prevState,
            location: selectedLocation,
        }));
    }, [selectedLocation, setPostDiary]);

    const handleLocationChange = (newLocation) => {
        setSelectedLocation(newLocation);
        setPostDiary((prevState) => ({
            ...prevState,
            location: newLocation,
        }));
        console.log(`Location updated to: ${newLocation}`);
    };

    const handleDiaryTypeChange = (type) => {
        setSelectedDiaryType(type);
    };

    const renderDiaryContent = () => {
        switch (selectedDiaryType) {
            case "농업 일지":
                return <Diary />;
            case "밭자랑":
                return <Pride />;
            default:
                return <p>선택된 내용이 없습니다.</p>;
        }
    };

    const openDiaryModal = () => {
        setShowModal(true);
    };

    const closeDiaryModal = () => {
        setShowModal(false);
    };

    const openInfoModal = () => {
        fetchPlantTypeInfo(plantDetail.plant_type_id);
        setShowInfoModal(true);
    };

    const closeInfoModal = () => {
        setShowInfoModal(false);
    };

    const fetchPlantTypeInfo = async (plantTypeId) => {
        if (!plantTypeId) {
            console.error("plantTypeId is null or undefined.");
            return;
        }
        try {
            const response = await axios.get(
                `https://trothly.com/plant/type/${plantTypeId}`
            );
            setPlantTypeInfo(response.data);
        } catch (error) {
            console.error("작물 상세 정보를 가져오는 데 실패했습니다.", error);
        }
    };

    const toggleComplete = async (todoId, isComplete) => {
        if (isComplete) {
            console.log("This todo is already completed.");
            return;
        }

        try {
            await axios.patch(
                `https://trothly.com/plant/todo/complete/${todoId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${plantDetail.access_token}`,
                    },
                }
            );

            const updatedTodos = plantDetail.todos.map((todo) => {
                if (todo.id === todoId) {
                    return { ...todo, is_complete: true };
                }
                return todo;
            });

            setPlantDetail((prevState) => ({
                ...prevState,
                todos: updatedTodos,
            }));

            console.log("Todo marked as complete successfully.");
        } catch (error) {
            console.error("Failed to mark todo as complete:", error);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        if (token) {
            setPlantDetail((prevState) => ({
                ...prevState,
                access_token: token,
            }));
        }
    }, [location.search]);

    useEffect(() => {
        setPlantDetail((prevDetail) => ({
            ...prevDetail,
            id: parseInt(id),
        }));

        const fetchPlantDetail = async () => {
            try {
                const response = await axios.get(
                    `https://trothly.com/plant/${id}`
                );
                setPlantDetail((prevDetail) => ({
                    ...prevDetail,
                    ...response.data,
                }));

                console.log(plantDetail);
            } catch (error) {
                console.error(
                    "식물 상세 정보를 가져오는데 실패했습니다.",
                    error
                );
            }
        };

        fetchPlantDetail();
    }, [id, setPlantDetail]);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return (
        <div className="w-full flex flex-col relative">
            <img
                src={`${BASE_URL}/${plantDetail.main_image}`}
                alt="상추"
                className="w-full h-auto"
            />
            <div className="flex flex-col p-5">
                <div className="flex items-center">
                    {" "}
                    <div className="text-[24px] mr-2">
                        {plantDetail.nickname}
                    </div>
                    <div className="text-[20px] text-[#A3A3A3]">
                        {plantDetail.plant_type_name}
                    </div>
                </div>
                <div className=" text-base text-primaryTextColor mt-2">
                    키운지 {calculateDaysSinceStart(plantDetail.start_at)}일 째
                </div>
                <div className="flex justify-around mt-2">
                    {/* Diary Modal */}
                    {showModal && (
                        <dialog className="modal" open>
                            <div className="modal-box h-full bg-[#F6F6F6] relative">
                                <button
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                    onClick={closeDiaryModal}
                                >
                                    ✕
                                </button>
                                <h3 className="text-[22px]">글 쓰기</h3>
                                <div className="flex">
                                    {" "}
                                    <p className="py-4">
                                        <details className="dropdown">
                                            <summary className="m-1 btn text-sm rounded-full text-primaryTextColor bg-[#7FBA7633] border-primaryColor">
                                                {selectedDiaryType}
                                            </summary>
                                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                <li>
                                                    <a
                                                        onClick={() =>
                                                            handleDiaryTypeChange(
                                                                "농업 일지"
                                                            )
                                                        }
                                                    >
                                                        농업 일지
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={() =>
                                                            handleDiaryTypeChange(
                                                                "밭자랑"
                                                            )
                                                        }
                                                    >
                                                        밭자랑
                                                    </a>
                                                </li>
                                            </ul>
                                        </details>
                                    </p>
                                    <p className="py-4">
                                        <details className="dropdown">
                                            <summary className="m-1 btn text-sm rounded-full text-primaryTextColor bg-[#7FBA7633] border-primaryColor">
                                                {selectedLocation}
                                            </summary>
                                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                <li>
                                                    <a
                                                        onClick={() =>
                                                            handleLocationChange(
                                                                "옥상"
                                                            )
                                                        }
                                                    >
                                                        옥상
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={() =>
                                                            handleLocationChange(
                                                                "베란다"
                                                            )
                                                        }
                                                    >
                                                        베란다
                                                    </a>
                                                </li>
                                            </ul>
                                        </details>
                                    </p>
                                </div>
                                {renderDiaryContent()}
                            </div>
                        </dialog>
                    )}
                    <button
                        onClick={openDiaryModal}
                        className="btn px-4 rounded-full border-none text-base font-normal bg-primaryBgColor text-white"
                    >
                        농업 일지 추가하기
                    </button>
                    {/* Info Modal */}

                    {showInfoModal && (
                        <dialog className="modal" open>
                            <div className="modal-box bg-[#F6F6F6] h-full relative">
                                <button
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                    onClick={closeInfoModal}
                                >
                                    ✕
                                </button>
                                <h3 className="font-bold text-[35px]">
                                    {plantTypeInfo?.name}
                                </h3>
                                <div className="flex">
                                    {plantTypeInfo?.features.map(
                                        (feature, index) => (
                                            <div key={index}>
                                                <div className="bg-[#7FBA7633] mr-1 px-2 py-1 rounded-full text-[#7FBA76] text-[12px]">
                                                    {feature}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="text-[22px] mt-4">
                                    작물 소개
                                </div>

                                <p className="py-4 text-[14px]">
                                    {plantTypeInfo?.introduction}
                                </p>

                                <div className="text-[22px] mt-4 mb-4">
                                    키우는 법
                                </div>
                                <div className="flex items-center">
                                    <SunlightSVG />
                                    <div className="rounded-full bg-white flex justify-center text-[#FF5454] items-center px-4 h-[37px] text-[14px]">
                                        {" "}
                                        {plantTypeInfo?.sunlight}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <TemperatureSVG />
                                    <div className="rounded-full bg-white text-[#FFB23E] flex justify-center items-center px-4 h-[37px] text-[14px]">
                                        {" "}
                                        {plantTypeInfo?.temperature}
                                    </div>{" "}
                                </div>
                                <div className="flex items-center">
                                    <HumiditySVG />
                                    <div className="rounded-full text-[#6DA0DB] bg-white flex justify-center items-center px-4 h-[37px] text-[14px]">
                                        {" "}
                                        {plantTypeInfo?.humidity}
                                    </div>{" "}
                                </div>
                                <div className="flex items-center">
                                    <WaterSVG />
                                    <div className="rounded-full text-[#3C82D3] bg-white flex justify-center items-center px-4 h-[37px] text-[14px]">
                                        {" "}
                                        {plantTypeInfo?.watering_method}
                                    </div>{" "}
                                </div>
                                <div className="flex items-center">
                                    <FlowerSVG />
                                    <div className="rounded-full text-[#F365FF] bg-white flex justify-center items-center px-4 h-[37px] text-[14px]">
                                        {" "}
                                        {plantTypeInfo?.blooming_season}
                                    </div>{" "}
                                </div>
                            </div>
                        </dialog>
                    )}
                    <button
                        onClick={openInfoModal}
                        className="btn px-4 rounded-full border-none text-base font-normal bg-white text-primaryTextColor"
                    >
                        작물 정보 확인하기
                    </button>
                </div>
                {/* todos list */}
                <div className="bg-white rounded-2xl p-6 mt-4">
                    <div className=" text-2xl font-semibold">오늘 할 일</div>
                    {plantDetail.todos.map((todo) => (
                        <>
                            {" "}
                            <div
                                key={todo.id}
                                className="flex items-center mt-2 justify-between"
                            >
                                <div className="flex">
                                    <img
                                        src={`${BASE_URL}${plantDetail.main_image}`}
                                        alt="plant"
                                        className="w-[60px] h-[60px] rounded-full mx-2 mr-3"
                                    />
                                    <div className="flex flex-col justify-center">
                                        {todo.is_complete ? (
                                            ""
                                        ) : (
                                            <span className="text-sm text-[#7FBA76]">
                                                {`${-getDaysUntilDeadline(
                                                    todo.deadline
                                                )}일 늦음`}
                                            </span>
                                        )}
                                        <span className=" font-semibold text-sm">
                                            {todo.type}
                                        </span>
                                        <span className=" font-normal text-sm text-[#A3A3A3]">
                                            {todo.plant.nickname}
                                        </span>
                                    </div>
                                </div>

                                {todo.is_complete ? (
                                    <input
                                        type="checkbox"
                                        checked
                                        className="checkbox checkbox-success h-[30px] w-[30px] rounded-full"
                                    />
                                ) : (
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            toggleComplete(
                                                todo.id,
                                                todo.is_complete
                                            )
                                        }
                                        className="checkbox checkbox-success h-[30px] w-[30px] rounded-full"
                                    />
                                )}
                            </div>
                        </>
                    ))}
                    <div className=" text-xs text-primaryTextColor mt-4">
                        {`${year}년 ${month}월 ${date}일(오늘)까지 완료해야하는 작업이에요`}
                    </div>
                </div>
                {/* timeline */}
                <div className="text-[26px] mt-10">기록</div>
                <ul className="timeline timeline-vertical mt-5 mb-5">
                    {plantDetail.records.map((record, index) => (
                        <li key={index}>
                            <hr className="bg-white" />
                            <div
                                className={
                                    record.type === "시작" ||
                                    record.type === "분갈이"
                                        ? "timeline-start timeline-box"
                                        : record.type === "물주기"
                                        ? "timeline-end timeline-box"
                                        : "timeline-box"
                                }
                            >
                                <p>
                                    {record.type === "시작" ? (
                                        <>
                                            {plantDetail.nickname}
                                            <br />
                                            키우기 시작한 날
                                        </>
                                    ) : (
                                        record.type
                                    )}
                                </p>
                                <p className=" text-[10px]">
                                    {record.complete_at}
                                </p>
                            </div>
                            <div className="timeline-middle">
                                {renderSVG(record.type)}
                            </div>
                            <hr className="bg-white" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PlantDetail;
