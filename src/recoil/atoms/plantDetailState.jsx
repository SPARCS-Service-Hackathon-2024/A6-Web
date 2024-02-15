import { atom } from "recoil";

export const plantDetailState = atom({
    key: "plantDetailState",
    default: {
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
                    main_image: null,
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
    },
});
