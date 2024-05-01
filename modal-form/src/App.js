// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [showDobTooltip, setShowDobTooltip] = useState(false);
  const [buttonColor, setButtonColor] = useState('#007bff'); // Initial color

  const handleOpenForm = () => {
    setIsOpen(true);
    setErrorMsg('');
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!username || !email || !phone || !dob) {
      setErrorMsg('! Please fill out all fields.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg(`Please include an '@' in the email address. ${email} is missing an '@'`);
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setErrorMsg('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      setErrorMsg('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    // Submit logic here, you can clear fields or make API calls
    setUsername('');
    setEmail('');
    setPhone('');
    setDob('');
    setIsOpen(false);
    setErrorMsg('');
  };

  // Function to change button color on page load
  const changeButtonColor = () => {
    setButtonColor('#dc3545'); // Change color to match modal form
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button style={{ backgroundColor: buttonColor }} onClick={handleOpenForm} onMouseOver={changeButtonColor} className="submit-button">
        Open Form
      </button>

      {isOpen && (
        <div className="modal" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setShowUsernameTooltip(false)}
                onBlur={() => setShowUsernameTooltip(!username)}
              />
              {showUsernameTooltip && <span className="tooltip show">Please fill out this field.</span>}
            </div>
            <div className="input-container">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setShowEmailTooltip(false)}
                onBlur={() => setShowEmailTooltip(!email.includes('@'))}
              />
              {showEmailTooltip && <span className="tooltip show">Please include an '@' in the email address. {email} is missing an '@'</span>}
            </div>
            <div className="input-container">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setShowPhoneTooltip(false)}
                onBlur={() => setShowPhoneTooltip(phone.length !== 10 || isNaN(phone))}
              />
              {showPhoneTooltip && <span className="tooltip show">Invalid phone number. Please enter a 10-digit phone number.</span>}
            </div>
            <div className="input-container">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onFocus={() => setShowDobTooltip(false)}
                onBlur={() => setShowDobTooltip(new Date(dob) > new Date())}
              />
              {showDobTooltip && <span className="tooltip show">Invalid date of birth. Date of birth cannot be in the future.</span>}
            </div>
            <div className="error-msg">{errorMsg}</div>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
