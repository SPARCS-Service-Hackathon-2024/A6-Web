import { atom } from "recoil";

export const postPrideState = atom({
    key: "postPrideState",
    default: {
        title: "",
        location: "옥상", // "베란다" or "옥상"
        description: "",
    },
});
