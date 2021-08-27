const handleMenuOpen = (setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {
    setIsOpen(!isOpen);
    document.querySelector('.first')?.classList.toggle('close-right')
    document.querySelector('.second')?.classList.toggle('close-left')
    document.querySelector('.third')?.classList.toggle('fade')
};

export default handleMenuOpen;