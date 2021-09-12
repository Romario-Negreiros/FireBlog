const handleMenuOpen = (
    setIsOpen: (isOpen: boolean) => void,
    isOpen: boolean
) => {
    setIsOpen(!isOpen);
    if (window.innerWidth <= 700) {
        document.querySelector('.first')?.classList.toggle('close-left');
        document.querySelector('.second')?.classList.toggle('close-right');
        document.querySelector('.third')?.classList.toggle('fade');
        document.querySelector('body')?.classList.toggle('body-on-menu-active');
    }
};

export default handleMenuOpen;
