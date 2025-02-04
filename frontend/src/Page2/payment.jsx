import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [price, setPrice] = useState(0);
  const [priceType, setPriceType] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setPrice(location.state.price);
      setPriceType(location.state.priceType);
    }
  }, [location.state]);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="section-title">Payment</h1>
        <button className="close-btn" onClick={() => navigate('/')}>
          &times;
        </button>

        <div className="payment-wrapper">
          {/* Left Section */}
          <div className="payment-options">
            <div className="payment-method">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="creditCard"
                onChange={() => handleMethodChange('creditCard')}
                checked={selectedMethod === 'creditCard'}
              />
              <div className="typecontainer">
                <label htmlFor="creditCard">Credit / Debit Card</label>
              </div>
            </div>
            <div className="payment-method">
              <input
                type="radio"
                id="qrCode"
                name="paymentMethod"
                value="qrCode"
                onChange={() => handleMethodChange('qrCode')}
                checked={selectedMethod === 'qrCode'}
              />
              <div className="typecontainer">
                <label htmlFor="qrCode">QR Code</label>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="payment-details">
            {selectedMethod === 'creditCard' && (
              <div className="credit-card-form">
                <h3>Enter Card Details</h3>
                <input type="text" placeholder="Card Number" maxLength="16" />
                <div className="card-info">
                  <input type="text" placeholder="MM / YY" maxLength="5" />
                  <input type="text" placeholder="CVC" maxLength="3" />
                </div>
                <select>
                  <option>Select Country</option>
                  <option>Thailand</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
            )}
            {selectedMethod === 'qrCode' && (
              <div className="qr-code">
                <h3>Scan QR Code</h3>
                <img
                  src="https://qrcode.in.th/wp-content/themes/QR-THEME/page-templates/assets/img/qr-code.svg"
                  alt="QR Code"
                  className="qr-code-img"
                />
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="payment-summary">
            <div className="summary-row">
              <span>{`1 ${priceType === 'weekly' ? 'week' : 'month'} × 1`}</span>
              <span>฿{price}</span>
            </div>
            <div className="summary-row">
              <span>VAT</span>
              <span>฿0</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>฿{price}</span>
            </div>
            <button
              className="continue-button"
              onClick={() => navigate('/paymentsuccessful')}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
