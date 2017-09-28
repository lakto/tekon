export class AppMixins {
    public static getWeek(date: Date) {
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        const week_1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week_1.getTime()) / 86400000 - 3 + (week_1.getDay() + 6) % 7) / 7);
    }
}
