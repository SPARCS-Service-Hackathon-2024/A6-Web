import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { useRecoilState } from "recoil";

function PlantRegisterImage() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef();
    const [plantRegister, setPlantRegister] =
        useRecoilState(plantRegisterState);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        if (token) {
            setPlantRegister((prevState) => ({
                ...prevState,
                access_token: token,
            }));
        }
        console.log(plantRegister);
    }, []);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setPlantRegister((prevState) => ({
                    ...prevState,
                    main_image: file,
                    main_image_url: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleNextButtonClick = () => {
        navigate("/plant/register/type");
    };

    return (
        <div className="w-full h-screen-custom flex flex-col relative">
            <div className=" mt-3 ml-4 text-[22px]">
                어떤 작물을 키우시나요?
            </div>
            <div className="h-full flex flex-col justify-center items-center">
                <div className="w-[180px] h-[180px] rounded-2xl bg-[#D9D9D9] mt-5">
                    {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    ) : (
                        // TODO: 이미지 없을 때 보여줄 이미지
                        <></>
                    )}
                </div>{" "}
                <button
                    className="btn bg-transparent text-primaryTextColor border-none"
                    onClick={handleButtonClick}
                >
                    사진 등록하기
                </button>{" "}
                <div className="w-[180px] h-[180px] rounded-2xl">
                    {" "}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileInputChange}
                    />
                </div>
            </div>
            <div className="px-4 pb-4 fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2">
                <button
                    className={`btn rounded-2xl border-none text-[22px] font-medium w-full max-w-[363px] h-[54px] 
                        bg-[#7FBA76] text-white
                    `}
                    onClick={handleNextButtonClick}
                >
                    다음으로
                </button>
            </div>
        </div>
    );
}

export default PlantRegisterImage;
