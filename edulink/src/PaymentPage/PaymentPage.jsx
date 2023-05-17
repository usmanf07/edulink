import React, {useEffect, useState} from 'react'
import {Navbar } from '../components';
import axios from 'axios';
import './paymentPage.css';
import CreditCard from './CreditCard.js';
export default function PaymentPage() {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem('email'));
    const [email, setEmail] = useState('');
    const [waitPayment, setWaitPayment] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState('');
    async function handleCreditCardInfo(cardInfo) {
        const { cardNumber, cardHolderName, cardExpirationDate, cardCVV } = cardInfo;
        const amount = 80;
        setMessage('');
        setLoading(true);
      
        try {
          const response = await axios.post('http://localhost:8000/users/charge', {
            email: email,
            cardNumber,
            cardCVV,
            expMonth: cardExpirationDate.slice(0, 2),
            expYear: cardExpirationDate.slice(2),
            amount,
          });
      
          setMessage(response.data.message);
        } catch (err) {
          console.error(err);
          setMessage('An error occurred while processing your payment.');
        }
      
        setLoading(false);
      }
      

    useEffect(() => {

        const email = sessionStorage.getItem('email');

        axios.get(`http://localhost:8000/users/${email}`)
          .then(res => {
            setEmail(email);
            setIsLogin(true);
          })
          .catch(err => {
            console.log(err);
          });
      }, []);

  return (

    <div>
        {/* <Navbar login={isLogin} name={email} /> */}
        <div className='paymentPage'>
       
        <CreditCard handleCreditCardInfo={handleCreditCardInfo} setWaitPayment={setWaitPayment} message={message}/>
        </div>
    </div>
  )
}
