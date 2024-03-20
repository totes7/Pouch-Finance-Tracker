import React, { useState, useEffect } from 'react';
import "../assets/styles/Form.css";
import { TransactionTypes } from "../utils/TransactionTypes";
import { auth, db, storage, collection, addDoc, ref, uploadBytesResumable, getDownloadURL, firestore } from "../utils/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchTransactionData } from "../utils/fetchTransactionData";
import useFetchName from "../utils/fetchName";

export function Form() {
  return (
    <div>
      <CreditCard />
      <TransactionForm />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

function CreditCard() {
  const [creditCardNumber, setCreditCardNumber] = useState(
    "2424 2424 2424 2424"
  ); // initial credit card
  const [isCreditCardEditing, setIsCreditCardEditing] = useState(false);
  const [expiryDate, setExpiryDate] = useState("12/24"); // Initial expiry date
  const [isExpiryEditing, setIsExpiryEditing] = useState(false);
  const { transactionData } = useFetchTransactionData();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { fullName } = useFetchName(auth.currentUser.uid);

  useEffect(() => {
    const expenses = transactionData
      .filter((transaction) => transaction.type !== "Income" && transaction.type !== "Savings")
      .reduce((total, transaction) => total + transaction.amount, 0);
    setTotalExpenses(expenses);
  }, [transactionData]);


  // Calculate savings and income amounts
  const savingsAmount = transactionData
    .filter((transaction) => transaction.type === "Savings")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const incomeAmount = transactionData
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = incomeAmount - totalExpenses;

  const handleCreditCardNumberChange = (event) => {
    setCreditCardNumber(event.target.value);
  };

  const handleCreditCardNumberClick = () => {
    setIsCreditCardEditing(true);
  };

  //user finishes editing the credit card number and clicks outside of the input field
  const handleCreditCardNumberBlur = () => {
    setIsCreditCardEditing(false);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleExpiryDateClick = () => {
    setIsExpiryEditing(true);
  };

  const handleExpiryDateBlur = () => {
    setIsExpiryEditing(false);
  };


  return (
    <div className="container credit-card">
      <div className="credit-card-container">
        <div className="logo-container">
          <i className="fa-solid fa-coins"></i>
          <i className="fa-brands fa-cc-visa"></i>
        </div>
        <div className="credit-card-number">
          {isCreditCardEditing ? (
            <input
              type="text"
              value={creditCardNumber}
              onChange={handleCreditCardNumberChange}
              onBlur={handleCreditCardNumberBlur}
              autoFocus
            />
          ) : (
            <h5 onClick={handleCreditCardNumberClick} className='number-font'>{creditCardNumber}</h5>
          )}
        </div>
        <div className="details-container">
          <div className="name">
            <p>FULL NAME</p>
            <p className="full-name">{fullName.toUpperCase()}</p>
          </div>
          <div className="expiry">
            {isExpiryEditing ? (
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                onBlur={handleExpiryDateBlur}
                autoFocus
              />
            ) : (
              <div>
                <p>EXPIRY/DATE:</p>
                <p className="date number-font" onClick={handleExpiryDateClick}>
                  {expiryDate}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="account-details">
        <div className="balance">
          <h3>Balance:</h3>
          <h3 className='number-font'>£{totalBalance.toFixed(2)}</h3>
        </div>
        <div className="savings">
          <h3>Savings:</h3>
          <h3 className='number-font'>£{savingsAmount.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

function TransactionForm() {


  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is "amount", parse the value to a float if it's not empty
    const parsedValue = name === 'amount' && value !== '' ? parseFloat(value) : value;

    setFormData({ ...formData, [name]: parsedValue });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const label = document.getElementById('fileInputLabel');

    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, pdfFile: file });
      label.textContent = file.name; // Update the label with the selected file name
    } else {
      // Reset the file input if an invalid file is selected
      e.target.value = null;
      setFormData({ ...formData, pdfFile: null });
      label.textContent = 'Choose a PDF file'; // Reset label text
      alert("Please select a PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFormError = () => toast.error("Form cannot be empty");

    try {
      const currentUser = auth.currentUser;
      const userUID = currentUser.uid;

      if (!formData.title || !formData.amount || !formData.type) {
        emptyFormError();
        return;
      }

      setIsSubmitting(true); // Set isSubmitting to true when form is submitted

      // Simulate a 3-second delay
      setTimeout(async () => {
        const userTransactionsCollection = collection(
          firestore,
          `users/${userUID}/transactions`
        );

        let pdfURL = "";

        if (formData.pdfFile) {
          const storageRef = ref(storage, `users/${userUID}/pdfs/${formData.pdfFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, formData.pdfFile);
          const snapshot = await uploadTask;
          pdfURL = await getDownloadURL(snapshot.ref); // Get download URL
        }

        const transactionData = {
          title: formData.title,
          amount: formData.amount,
          type: formData.type,
          pdfURL: pdfURL
        };

        await addDoc(userTransactionsCollection, transactionData);

        // Refresh the page after submission
        window.location.reload();
        setFormData({
          title: "",
          amount: "",
          type: "",
          pdfFile: null,
        });
        setIsSubmitting(false); // Set isSubmitting back to false after form submission
      }, 3000); // Simulate a 3-second delay

    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <div className="container transaction-form">
      <h2>NEW TRANSACTION</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="E.g. Phone Bill"
          autoComplete="title"

        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="£"
          autoComplete="username"

        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}

        >
          <option disabled value="">
            Select a transaction type
          </option>
          {TransactionTypes.map((type) => (
            <option key={type.id} value={type.title}>
              {type.title}
            </option>
          ))}
        </select>
        <label htmlFor="document">Document</label>
        <div className="file-input-container">
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleFileChange}

          />
          <label htmlFor="pdfFile" className="file-input-label" id="fileInputLabel">Choose a PDF file</label>
        </div>
        {isSubmitting ? (
          <div className="spinner-wrapper">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <button type="submit">Add Transaction</button>
        )}
      </form>
    </div>
  );
}

export default Form;
