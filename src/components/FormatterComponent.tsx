
export const FormattedDate: React.FC<{ date: number | string }> = ({ date }) => {
    const d = new Date(date);
    const formatted = d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return <span>{formatted}</span>;
};


