const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>, setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {
    setIsOpen(!isOpen);
    if (event.currentTarget.firstElementChild)
        event.currentTarget.firstElementChild.classList.toggle(
            'close-left'
        );
    if (event.currentTarget.firstElementChild?.nextElementSibling)
        event.currentTarget.firstElementChild.nextElementSibling.classList.toggle(
            'close-right'
        );
    if (event.currentTarget.lastElementChild) {
        event.currentTarget.lastElementChild.classList.toggle('fade');
    }
};

export default handleMenuOpen;