export const calculateDaysSinceStart = (startAt) => {
    const startDate = new Date(startAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const differenceInTime = today.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
        return "오늘";
    } else {
        return `${differenceInDays}`;
    }
};
