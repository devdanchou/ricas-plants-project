import { useContext } from "react";
import { motion } from "framer-motion";
import SessionContext from "contexts/SessionContext";

const MobileMenuModal = (props) => {
    const {username, signOut} = useContext(SessionContext);
    const {onCartOpenClick} = props;

    return <motion.div
            className="bg-emerald-800 text-emerald-200 flex flex-col items-start pt-12 pr-12 text-lg pb-6 rounded-bl-lg shadow-md"
            initial={{ translateY: "-100%" }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.5 }}
            >
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
    </motion.div>
};

export default MobileMenuModal;