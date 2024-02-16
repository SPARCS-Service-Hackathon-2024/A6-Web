import { atom } from "recoil";

export const postDiaryState = atom({
    key: "postDiaryState",
    default: {
        title: "",
        loacation: "옥상", // "베란다" or "옥상"
        description: "",
        plants: [],
        images: null,
    },
});
