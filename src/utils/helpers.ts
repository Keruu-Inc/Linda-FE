export const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
};