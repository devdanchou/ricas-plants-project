import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SessionContext from "contexts/SessionContext";
import CartModal from "./modals/CartModal";
import ModalWrapper from "./modals/CartModal/ModalWrapper";
import MobileMenuModal from "./modals/CartModal/MobileMenuModal";

const NavBar = () => {
  const { username, signOut } = useContext(SessionContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <nav
        className="flex justify-center bg-emerald-800 font-lato"
        onMouseLeave={() => setIsUserMenuOpen(false)}
      >
        <div className="flex items-center justify-between w-full max-w-5xl px-8 py-2">
          <Link to="/plants">
            <div className="flex flex-col items-center text-2xl text-white font-playfair">
              <img
                src="https://static-task-assets.react-formula.com/capstone_logo_light.png"
                className="w-10"
              />
              Rica's Plants
            </div>
          </Link>
          <div className="flex justify-end flex-1 hidden sm:flex">
            <div className="relative min-w-32">
              <button
                className="flex items-center text-emerald-200"
                onClick={() => setIsUserMenuOpen(true)}
              >
                <i className="fa-solid fa-user mr-2 text-xl"></i>
                {username}
              </button>
              {isUserMenuOpen && (
                <div className="absolute left-0 mt-20 bg-white bottom-[-46px] rounded-md shadow-md">
                  <button
                    onClick={signOut}
                    className="px-4 py-2 text-slate-500 hover:text-emerald-700"
                  >
                    <i className="mr-2 fa-solid fa-arrow-right-from-bracket"></i>
                    sign out
                  </button>
                </div>
              )}
            </div>
            <button
              className="flex items-center text-emerald-200"
              onClick={() => setIsCartOpen(true)}>
              <i className="mr-2 text-xl fa-solid fa-cart-shopping"></i>
              cart
            </button>
          </div>
          <button
            className="flex sm:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <i className="fa-solid fa-bars text-4xl text-emerald-400"></i>
          </button>
        </div>
      </nav>
        <ModalWrapper isOpen={isCartOpen} onCloseClick={() => setIsCartOpen(false)}>
          <CartModal setIsCartOpen={setIsCartOpen}/>
        </ModalWrapper>
        <ModalWrapper isOpen={mobileMenuOpen} onCloseClick={() => setMobileMenuOpen(false)}>
          <MobileMenuModal
            onCartOpenClick={() => {
              setIsCartOpen(true);
              setMobileMenuOpen(false);
            }}
          />
        </ModalWrapper>
    </>
  );
};

export default NavBar;
