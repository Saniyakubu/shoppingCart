import { useContext, useState } from 'react';
import { StoreContext } from '../context/contextStore';
import { TbPlus, TbMinus } from 'react-icons/tb';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// material Ui
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// style
import '../scss/Cart.scss';

const Cart = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function checkout() {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
    console.log('object');
    setTimeout(() => {
      toast.success(
        'Thank you for your purchase! Your order has been confirmed.'
      );
    }, 5000);
    setTimeout(() => {
      navigate('/');
    }, 6000);
  }
  /* Thank you for your purchase! Your order has been confirmed. */
  const {
    storeProducts,
    cartProducts,
    addToCart,
    removeFromCart,
    updateAmount,
    getTotalAmount,
    hasNumberBiggerThanZero,
  } = useContext(StoreContext);
  const totalPrice = getTotalAmount();

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster position="top-center" reverseOrder={false} />
      {hasNumberBiggerThanZero ? (
        <div className="box">
          <h1>Shopping Cart</h1>
          <div className="cartBox">
            <header className="titles">
              <h1>product</h1>
              <div>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
              <p className="mycart">My Cart</p>
            </header>
            {storeProducts &&
              storeProducts.map((items) => {
                const { id, title, image, price } = items;
                if (cartProducts[id] > 0) {
                  return (
                    <div key={id} className="productsBox">
                      <div className="product">
                        <div className="productimg">
                          <img src={image} />
                          <p>{title}</p>
                        </div>

                        <div className="productInfo">
                          <p>${price}</p>
                          <div className="input">
                            <Button
                              variant="contained"
                              className="btncart"
                              onClick={() => addToCart(id)}
                            >
                              <TbPlus />
                            </Button>
                            <input
                              type="number"
                              value={cartProducts[id]}
                              onChange={(e) =>
                                updateAmount(Number(e.target.value), id)
                              }
                            />
                            <Button
                              variant="contained"
                              className="btncart"
                              onClick={() => removeFromCart(id)}
                            >
                              <TbMinus />
                            </Button>
                          </div>

                          <p className="sub">${price}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <div className="total">
            <div>
              <div>
                <h1>subtotal</h1>
              </div>
              <div>
                <h1> ${totalPrice}</h1>
              </div>
            </div>
            <div>
              <div>
                <h1>Total</h1>
              </div>
              <div>
                <h1>${totalPrice}</h1>
              </div>
            </div>
          </div>
          <div style={{ margin: '30px' }}>
            <Button variant="contained" onClick={checkout}>
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="empty">
          <h1>Your cart is currently empty</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
