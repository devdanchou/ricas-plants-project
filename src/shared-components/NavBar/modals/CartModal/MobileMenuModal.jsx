import { useContext } from "react";
import SessionContext from "contexts/SessionContext";

const MobileMenuModal = (props) => {
    const {username, signOut} = useContext(SessionContext);
    const {onCartOpenClick} = props;

    return <div className="bg-emerald-800 text-emerald-200 flex flex-col items-start pt-12 pr-12 text-lg pb-6 rounded-bl-lg shadow-md">
        <div className="px-8 py-4">
            <i className="mr-2 text-2xl fa-solid fa-user"></i>
            {username}
        </div>
        <button
            className="px-8 py-4"
            onClick={signOut}
            >
            <i className="mr-2 text-2xl fa-solid fa-arrow-right-from-bracket"></i>
            sign out</button>
        <button
            className="px-8 py-4"
            onClick={onCartOpenClick}>
            <i className="mr-2 text-2xl fa-solid fa-cart-shopping"></i>
            cart</button>
    </div>
};

export default MobileMenuModal;