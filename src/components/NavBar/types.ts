export default interface StyledProps {
    isOpen: boolean;
}

export interface Props {
    hasPostsChanged: boolean;
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
    toggleTheme: () => void;
}
