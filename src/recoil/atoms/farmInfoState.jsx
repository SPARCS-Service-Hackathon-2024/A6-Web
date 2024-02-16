import { atom } from "recoil";

export const farmInfoState = atom({
    key: "farmInfoState",
    default: {
        farm_image: "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
        plants: [
            {
                id: 9,
                nickname: "닉네임",
                main_image:
                    "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                start_at: "2024-02-02",
                plant_type_name: "상추",
                last_watered_at: "2024-02-14",
                last_repotted_at: "2024-02-02",
                is_selected: false,
            },
            {
                id: 10,
                nickname: "닉네임",
                main_image:
                    "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                start_at: "2024-02-02",
                plant_type_name: "상추",
                last_watered_at: "2024-02-14",
                last_repotted_at: "2024-02-14",
                is_selected: false,
            },
            {
                id: 11,
                nickname: "닉네임",
                main_image:
                    "media/plant_types/c26a41adfc5e472b80a778f3918ad8e7.png",
                start_at: "2024-02-02",
                plant_type_name: "상추",
                last_watered_at: "2024-02-14",
                last_repotted_at: "2024-02-14",
                is_selected: true,
            },
        ],
    },
});
