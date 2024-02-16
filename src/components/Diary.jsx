import { useRecoilState } from "recoil";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { farmInfoState } from "../recoil/atoms/farmInfoState";
import { plantDetailState } from "../recoil/atoms/plantDetailState";
import { postDiaryState } from "../recoil/atoms/postDiaryState";
import { diaryModalState } from "../recoil/atoms/diaryModalState";
import 상추 from "../assets/상추.png";

function Diary() {
    const [farmInfo, setFarmInfo] = useRecoilState(farmInfoState);
    const [plantDetail] = useRecoilState(plantDetailState);
    const [uniquePlantTypes, setUniquePlantTypes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [postDiary, setPostDiary] = useRecoilState(postDiaryState);
    const fileInputRef = useRef();
    const [imagePreview, setImagePreview] = useState(null);
    const [, setShowModal] = useRecoilState(diaryModalState);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const filteredPlants = farmInfo.plants.filter(
            (plant) => plant.is_selected
        );

        const plantTypes = filteredPlants.map((plant) => plant.plant_type_name);
        const uniquePlantTypes = [...new Set(plantTypes)];

        setUniquePlantTypes(uniquePlantTypes);
    }, [farmInfo.plants]);

    useEffect(() => {
        console.log(postDiary);
    }, [postDiary, title, content, imagePreview]);

    useEffect(() => {
        setPostDiary((prevState) => ({
            ...prevState,
            title: title,
            description: content,
        }));
    }, [title, content, setPostDiary]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", postDiary.title);
        formData.append("location", postDiary.location);
        formData.append("description", postDiary.description);
        formData.append("plants", JSON.stringify(postDiary.plants));

        if (postDiary.image) {
            formData.append("image", postDiary.image);
        }

        try {
            const response = await axios.post(
                "https://trothly.com/diary/plant",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${plantDetail.access_token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            setShowModal(false);
        } catch (error) {
            console.error("Failed to submit diary:", error);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setPostDiary((prevState) => ({
                    ...prevState,
                    image_url: reader.result,
                    image: file,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const toggleDropdown = () => {
        const hasUnselectedPlants = farmInfo.plants.some(
            (plant) => !plant.is_selected
        );
        if (hasUnselectedPlants) {
            setShowDropdown(!showDropdown);
        }
    };

    const handlePlantSelect = (id) => {
        const updatedPlants = farmInfo.plants.map((plant) =>
            plant.id === id
                ? { ...plant, is_selected: !plant.is_selected }
                : plant
        );
        setFarmInfo({ ...farmInfo, plants: updatedPlants });

        const selectedPlantIds = updatedPlants
            .filter((plant) => plant.is_selected)
            .map((plant) => plant.id);
        setPostDiary((prevState) => ({
            ...prevState,
            plants: selectedPlantIds,
        }));

        setShowDropdown(!showDropdown);
    };
    const fetchFarmInfo = async () => {
        try {
            const response = await axios.get(
                `https://trothly.com/farm/my/${plantDetail.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${plantDetail.access_token}`,
                    },
                }
            );
            console.log(response.data);

            const updatedPlants = response.data.plants.map((plant) => ({
                ...plant,
                main_image: plant.main_image || 상추, // main_image가 없으면 기본 이미지로 설정
            }));

            setFarmInfo({ ...response.data, plants: updatedPlants });

            const plantTypes = updatedPlants.map(
                (plant) => plant.plant_type_name
            );
            const uniqueTypes = [...new Set(plantTypes)];
            setUniquePlantTypes(uniqueTypes);
        } catch (error) {
            console.error("작물 상세 정보를 가져오는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        fetchFarmInfo();
    }, []);

    return (
        <div>
            <div className="flex">
                {" "}
                {uniquePlantTypes.map((type, index) => (
                    <div key={index}>
                        <div className="bg-[#7FBA7633] mr-1 px-2 py-1 rounded-full text-[#7FBA76] text-[12px]">
                            {type}
                        </div>
                    </div>
                ))}
            </div>

            <label className="form-control w-full max-w-xs">
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input rounded-2xl text-[16px] mt-3 w-full max-w-xs"
                />
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">{`${title.length}/30`}</span>
                </div>
            </label>
            <label className="form-control mt-3">
                <textarea
                    className="textarea h-[280px] rounded-2xl text-[16px]"
                    placeholder="본문(필수)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">{`${content.length}/5000`}</span>
                </div>
            </label>

            <div className="flex flex-col mb-3 justify-start">
                <div className="mr-2">나의 작물</div>
                <button
                    onClick={toggleDropdown}
                    className="btn btn-sm w-28 bg-transparent text-primaryTextColor"
                    disabled={
                        !farmInfo.plants.some((plant) => !plant.is_selected)
                    }
                >
                    식물 추가하기
                </button>

                {showDropdown && (
                    <ul className="menu p-2 shadow bg-base-100 rounded-box w-52">
                        {farmInfo.plants
                            .filter((plant) => !plant.is_selected)
                            .map((plant) => (
                                <li
                                    key={plant.id}
                                    onClick={() => handlePlantSelect(plant.id)}
                                >
                                    <a>{plant.nickname}</a>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            {farmInfo.plants
                .filter((plant) => plant.is_selected)
                .map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                ))}

            <div className="my-5">사진 추가하기</div>
            <div className="flex ">
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-[80px] h-[80px] object-cover rounded-2xl"
                    />
                ) : (
                    <div className="w-[80px] h-[80px] rounded-2xl bg-[#D9D9D9]"></div>
                )}
                <button
                    className="btn ml-2 w-[80px] h-[80px] rounded-2xl text-3xl bg-white text-primaryTextColor"
                    onClick={handleButtonClick}
                >
                    +
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                />
            </div>
            <div className="flex justify-end my-6">
                {" "}
                <div
                    className="flex justify-center items-center w-[140px] text-[18px] h-[40px] rounded-full bg-primaryBgColor text-white"
                    onClick={handleSubmit}
                >
                    공개 게시하기
                </div>
            </div>
        </div>
    );
}

function PlantCard({ plant }) {
    const BASE_URL = "https://trothly.com/";

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
        <div className="w-full h-[120px] p-[10px] bg-white my-2 rounded-2xl flex">
            <img
                src={plant.main_image ? `${BASE_URL}${plant.main_image}` : 상추}
                className="w-[90px] h-[90px] object-cover rounded-2xl mr-2 mt-1"
            />
            <div className="flex flex-col justify-center">
                <div className="flex">
                    {" "}
                    <div className=" font-semibold text-lg mr-2">
                        {plant.nickname}
                    </div>
                    <div className=" font-normal text-lg text-[#A3A3A3]">
                        {plant.plant_type_name}
                    </div>
                </div>{" "}
                <div className=" text-base text-primaryTextColor">
                    키운지 {calculateDaysSinceStart(plant.start_at)}일 째
                </div>
                <div className="flex gap-1 mt-3">
                    {" "}
                    <div className="rounded-full text-[10px] px-2 py-1 flex items-center text-[#3C82D3] bg-[#3C82D333]">
                        {calculateDaysSinceStart(plant.last_watered_at)}일 전 물
                        줌
                    </div>
                    <div className="rounded-full text-[10px] px-2 py-1 flex items-center text-[#FFB23E] bg-[#FFB23E33]">
                        {calculateDaysSinceStart(plant.last_repotted_at)} 일 전
                        분갈이 함
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diary;
