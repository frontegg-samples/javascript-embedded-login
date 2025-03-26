export function copyToClipboardButton(text) {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy to clipboard');

    button.innerHTML = `
        <svg width='16' height='17' viewBox='0 0 16 17' fill='#C3C5CA' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_144_522)'>
                <path d='M10.6654 1.1665H2.66536C1.93203 1.1665 1.33203 1.7665 1.33203 2.49984V11.8332H2.66536V2.49984H10.6654V1.1665ZM12.6654 3.83317H5.33203C4.5987 3.83317 3.9987 4.43317 3.9987 5.1665V14.4998C3.9987 15.2332 4.5987 15.8332 5.33203 15.8332H12.6654C13.3987 15.8332 13.9987 15.2332 13.9987 14.4998V5.1665C13.9987 4.43317 13.3987 3.83317 12.6654 3.83317ZM12.6654 14.4998H5.33203V5.1665H12.6654V14.4998Z' />
            </g>
            <defs>
                <clipPath id='clip0_144_522'>
                    <rect width='16' height='16' fill='white' transform='translate(0 0.5)' />
                </clipPath>
            </defs>
        </svg>
    `;

    button.addEventListener('click', () => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    });

    return button;
}
