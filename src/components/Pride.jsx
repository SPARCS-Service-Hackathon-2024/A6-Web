import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { farmInfoState } from "../recoil/atoms/farmInfoState";
import { plantDetailState } from "../recoil/atoms/plantDetailState";
import { diaryModalState } from "../recoil/atoms/diaryModalState";
import { postPrideState } from "../recoil/atoms/postPrideState";

function Pride() {
    const [farmInfo, setFarmInfo] = useRecoilState(farmInfoState);
    const [plantDetail] = useRecoilState(plantDetailState);
    const [uniquePlantTypes, setUniquePlantTypes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postPride, setPostPride] = useRecoilState(postPrideState);
    const [, setShowModal] = useRecoilState(diaryModalState);
    const BASE_URL = "https://trothly.com/";

    useEffect(() => {
        console.log(postPride);
    }, [postPride, title, content]);

    useEffect(() => {
        setPostPride((prevState) => ({
            ...prevState,
            title: title,
        }));
    }, [title, setPostPride]);

    useEffect(() => {
        setPostPride((prevState) => ({
            ...prevState,
            description: content,
        }));
    }, [content, setPostPride]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", postPride.title);
        formData.append("location", postPride.location);
        formData.append("description", postPride.description);
        postPride.plants.forEach((plant) => formData.append("plants", plant));

        try {
            const response = await axios.post(
                "https://trothly.com/diary/farm",
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

    useEffect(() => {
        const selectedPlantIds = farmInfo.plants
            .filter((plant) => plant.is_selected)
            .map((plant) => plant.id);

        setPostPride((prevState) => ({
            ...prevState,
            plants: selectedPlantIds,
        }));
        console.log("postDiary:", postPride);
    }, [farmInfo, setPostPride]);

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
            setFarmInfo(response.data);
            const plantTypes = response.data.plants.map(
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
                <div className="mr-2 my-4 text-[22px]">나의 밭</div>
                <div className="w-[300px] h-[180px] bg-white rounded-2xl">
                    {" "}
                    <img
                        className="object-cover w-full h-full rounded-2xl"
                        src={`${BASE_URL}${plantDetail.main_image}`}
                    ></img>
                    <div className="flex items-center">
                        <div className="my-2 mr-2 text-[16px]">태그된 식물</div>{" "}
                        <div>
                            <div className="bg-[#7FBA7633] mr-1 px-2 py-1 rounded-full text-[#7FBA76] text-[12px]">
                                {farmInfo.plants.length}개
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end my-6">
                {" "}
                <div
                    className="my-10 flex justify-center items-center w-[140px] text-[18px] h-[40px] rounded-full bg-primaryBgColor text-white"
                    onClick={handleSubmit}
                >
                    공개 게시하기
                </div>
            </div>
        </div>
    );
}

export default Pride;
