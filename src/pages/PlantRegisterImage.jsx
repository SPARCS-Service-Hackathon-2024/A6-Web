import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { plantRegisterState } from "../recoil/atoms/plantRegisterState";
import { useRecoilState } from "recoil";

function PlantRegisterImage() {
    const [preview, setPreview] = useState();
    const fileInputRef = useRef();
    const [plantRegister, setPlantRegister] =
        useRecoilState(plantRegisterState);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(plantRegister);
    }, [plantRegister]);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setPlantRegister((prevState) => ({
                    ...prevState,
                    main_image: reader.result,
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
        <div className="w-full h-screen flex flex-col relative">
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
            <div className="flex justify-center">
                <button
                    className="btn btn-wide rounded-2xl border-none bg-[#7FBA76] text-white text w-[363px] h-[54px]  absolute bottom-10"
                    onClick={handleNextButtonClick}
                >
                    다음으로
                </button>
            </div>
        </div>
    );
}

export default PlantRegisterImage;