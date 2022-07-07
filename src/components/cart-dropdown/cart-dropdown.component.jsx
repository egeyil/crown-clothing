import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  return (
    <div class='cart-dropdown-container'>
      <div class='cart-items'></div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
