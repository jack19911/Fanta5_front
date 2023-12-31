import { useAuth } from "@/services/auth";
import {
  selectCartIsEmpty,
  selectTotalCartItems,
  useCart,
  useCartPanel,
} from "@/services/cart";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/fanta5.png";
import { IfLogged, CartPanel } from "@/shared";

const isActive = (obj: { isActive: boolean }) =>
  obj.isActive ? "text-xl text-sky-400 font-bold" : "text-xl text-white";

export function NavBar() {
  const isCartPanelOpened = useCartPanel((state) => state.open);
  const toggleCartPanel = useCartPanel((state) => state.toggle);
  const totalCartItems = useCart(selectTotalCartItems);
  const isEmpty = useCart(selectCartIsEmpty);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  function logoutHandler() {
    logout();
    navigate("/login");
  }

  return (
    <div className="fixed z-1 top-0 left-0 right-0 shadow-2xl">
      <div className="flex items-center justify-between h-20 bg-slate-900 text-white p-3 shadow-2xl">
        {/*Logo*/}
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-16 rounded-2xl" />
          <NavLink to="shop" className={isActive}>
            FANTA 5
          </NavLink>
        </div>

        {/*Cart Button Badge */}
        <div>
          <button
            disabled={isEmpty}
            className="btn accent lg"
            onClick={toggleCartPanel}
          >
            Cart: {totalCartItems}
          </button>
        </div>
      </div>

      {/* Cart Panel */}
      {isCartPanelOpened && <CartPanel/>}

      {/*Login / CMS / Logout buttons*/}
      <div className="fixed bottom-2 right-2 text-white p-5 ">
        <NavLink to="cms" className="btn accent lg">
          cms
        </NavLink>
        <IfLogged
          else={
            <NavLink to="login" className="btn accent lg">
              login
            </NavLink>
          }
        >
          <button className="btn primary lg" onClick={logoutHandler}>
            logout
          </button>
        </IfLogged>
      </div>
    </div>
  );
}
