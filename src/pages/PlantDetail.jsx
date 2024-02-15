import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { plantDetailState } from "../recoil/atoms/plantDetailState";
// import axios from "axios";
import { useEffect } from "react";
import 상추 from "../assets/상추.png";

function PlantDetail() {
    const { id } = useParams();
    console.log(id);
    const [plantDetail, setPlantDetail] = useRecoilState(plantDetailState);

    useEffect(() => {
        // 서버로부터 식물 상세 정보 가져오기
        const fetchPlantDetail = async () => {
            try {
                // const response = await axios.get(
                //     `https://trothly.com/plant/${id}`
                // );
                // setPlantDetail(response.data); // 가져온 데이터를 Recoil 상태에 저장
                setPlantDetail({
                    id: 1,
                    nickname: "닉네임",
                    main_image: null,
                    start_at: "2024-02-02",
                    plant_type_name: "상추",
                    todos: [
                        {
                            id: 8,
                            plant: {
                                id: 11,
                                main_image: { 상추 },
                                nickname: "닉네임",
                                plant_type_name: "상추",
                            },
                            created_at: "2024-02-14T16:32:53.360755",
                            updated_at: "2024-02-14T16:32:53.360775",
                            type: "물주기",
                            deadline: "2024-02-04",
                            complete_at: null,
                            is_complete: false,
                        },
                    ],
                    records: [
                        {
                            type: "분갈이",
                            complete_at: "2024-02-14",
                        },
                        {
                            type: "시작",
                            complete_at: "2024-02-02",
                        },
                    ],
                });
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

    return (
        <div className="w-full h-screen-custom flex flex-col relative">
            <img src={상추} alt="상추" className="w-full h-auto" />
            <div className="text-[22px] mb-3">이렇게 등록할게요!</div>
            <div className="px-4 pb-4 fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2"></div>
        </div>
    );
}

export default PlantDetail;
