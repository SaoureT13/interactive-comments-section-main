const DateComponent = ({ date }) => {
    const formatRelativeTime = (date) => {
        const now = new Date();
        const then = new Date(date);
        const seconds = Math.round((now - then) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);
        const weeks = Math.round(days / 7);
        const months = Math.round(days / 30);
        const years = Math.round(days / 365);

        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

        if (seconds === 0) {
            return "now";
        }
        if (years > 0) {
            return rtf.format(-years, "year");
        }
        if (months > 0) {
            return rtf.format(-months, "month");
        }
        if (weeks > 0) {
            return rtf.format(-weeks, "week");
        }
        if (days > 0) {
            return rtf.format(-days, "day");
        }
        if (hours > 0) {
            return rtf.format(-hours, "hour");
        }
        if (minutes > 0) {
            return rtf.format(-minutes, "minute");
        }
        return rtf.format(-seconds, "second");
    };

    return <span>{formatRelativeTime(date)}</span>;
};

export default DateComponent;
