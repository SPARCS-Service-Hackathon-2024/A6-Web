import { atom } from "recoil";

export const plantRegisterState = atom({
    key: "plantRegisterState",
    default: {
        main_image: null,
        plant_type: 1,
        nickname: "nickname",
        start_at: "2024-02-02",
        watered_at: "2024-02-02",
        repotted_at: "2024-02-02",
    },
});
