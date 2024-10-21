export const formatZodError = (errors) => {
    return errors.map((error) => {
        const path = error.path.join(".");
        const message = error.message;
        return `${path}: ${message}`;
    });
};
