export function generateRandomDate() {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    const futureDate = new Date(currentDate);

    pastDate.setDate(currentDate.getDate() - 3);
    futureDate.setDate(currentDate.getDate() + 3);

    const randomTime =
        pastDate.getTime() +
        Math.random() * (futureDate.getTime() - pastDate.getTime());

    return new Date(randomTime);
}

export function getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
