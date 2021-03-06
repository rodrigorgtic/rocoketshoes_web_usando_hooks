import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ProductTable, Total } from './styles';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/format';

export default function Cart() {
  const total = useSelector(state => {
    //reduce utilizamos quando queremos pegar um array e reduzir a um único valor.
    formatPrice(state.cart.reduce((totalSum, product) => {
    return totalSum + product.price *  product.amount; // A cada interação calcula o total e no fim retorna para a variavel total.
  }, 0))// inicia com valor zero.
  });

  const cart = useSelector(state => {
    return state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  });useDispatch();

  const dispath = useDispatch();


  function increment(product){
    dispath(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product){
    dispath(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
   <Container>
     <ProductTable>
      <thead>
        <tr>
          <th />
          <th>PRODUTO</th>
          <th>QTD</th>
          <th>SUBTOTAL</th>
          <th />
        </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
            <td>
              <img src={product.image} alt={product.title} />
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>
            <td>
              <div>
                <button type="button" onClick={() => decrement(product)}>
                  <MdRemoveCircleOutline size={20} color="#7159c1"/>
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button" onClick={() => increment(product)}>
                  <MdAddCircleOutline size={20} color="#7159c1"/>
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subtotal}</strong>
            </td>
            <td>
              <button type="button" onClick={() => dispath(CartActions.removeFromCart(product.id))}>
                <MdDelete size={20} color="#7159c1"/>
              </button>
            </td>
          </tr>
          ))}
        </tbody>
     </ProductTable>

     <footer>
       <button type="button">Finalizar pedido</button>
       <Total>
         <span>TOTAL</span>
         <strong>{total}</strong>
       </Total>
     </footer>
   </Container>
  );
}
