const handleMenuOpen = (setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {
    setIsOpen(!isOpen);
    document.querySelector('.first')?.classList.toggle('close-left')
    document.querySelector('.second')?.classList.toggle('close-right')
    document.querySelector('.third')?.classList.toggle('fade')
};

export default handleMenuOpen;