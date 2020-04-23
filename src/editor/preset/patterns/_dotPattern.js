export default function (size = 10) {
    return `
        background-image: radial-gradient(currentColor ${size/20}px, transparent ${size/20}px);
        background-size: ${size/2}px ${size/2}px;
    `
}