export const formattedName = (fullName: string) => {
    const parts = fullName.trim().split(" ");

    const lastName = parts.pop().toUpperCase();

    const formattedNames = parts.map(name =>
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );

    return [...formattedNames, lastName].join(" ");
}