import { atom } from "recoil";

export const plantRegisterState = atom({
    key: "plantRegisterState",
    default: {
        main_image: null,
        main_image_url: null,
        plant_type: 1,
        plant_type_name: "상추",
        nickname: "nickname",
        start_at: "2024-02-02",
        watered_at: "2024-02-02",
        repotted_at: "2024-02-02",
        access_token: "",
    },
});
