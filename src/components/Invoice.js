export const proceedToCheckout = (cart, total, customerDetails) => {
  const newWindow = window.open('', '_blank'); // Open a new tab

  if (newWindow) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // Format date as dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString('en-GB', { hour12: false }); // Format time as hh:mm:ss
    const milliseconds = now.getMilliseconds(); // Get milliseconds
    const dateTimeString = `${formattedDate} ${formattedTime}:${milliseconds}`;

    newWindow.document.write('<html><head><title>Invoice</title>');
    newWindow.document.write('<style>');
    newWindow.document.write(`
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
        background-color: #f4f4f4;
      }
      .container {
        position: relative;
        max-width: 1000px;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      }
      .header, .footer {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo {
        width: 150px;
        height: auto;
        margin-bottom: 20px;
      }
      h1 {
        color: #0056b3;
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }
      h2 {
        color: #333;
        margin-top: 20px;
        font-size: 22px;
        font-weight: 500;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
        background-color: #fff;
      }
      th, td {
        padding: 15px;
        border: 1px solid #ddd;
        text-align: left;
        font-size: 14px;
      }
      th {
        background-color: #e0e0e0;
        font-weight: 600;
        color: #0056b3;
      }
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      h3.total {
        text-align: right;
        margin-top: 30px;
        color: #333;
        font-size: 20px;
        font-weight: 600;
      }
      .customer-details {
        margin-top: 30px;
        padding: 15px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 6px;
      }
      .customer-details p {
        margin: 10px 0;
        font-size: 14px;
      }
      .footer {
        margin-top: 40px;
        font-size: 14px;
        color: #777;
        text-align: center;
      }
      .thank-you {
        font-weight: 600;
        color: #0056b3;
        font-size: 16px;
      }
      .payment-options {
        margin-top: 20px;
        text-align: center;
      }
      .payment-button {
        display: inline-block;
        margin: 10px;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .payment-upi {
        background-color: #ff5722;
      }
      .payment-card {
        background-color: #3f51b5;
      }
      .payment-cash {
        background-color: #795548;
      }
      .confirmation-message {
        margin-top: 30px;
        font-size: 16px;
        font-weight: 500;
        color: #0056b3;
      }
      .print-download {
        margin-top: 20px;
        text-align: center;
      }
      .print-download-button {
        display: inline-block;
        margin: 10px;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #2196f3;
      }
      .print-download-button:hover {
        background-color: #1976d2;
      }
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
      }
      .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }
      .modal-content button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
      .modal-content .print {
        background-color: #4caf50;
        color: #fff;
      }
      .modal-content .download {
        background-color: #2196f3;
        color: #fff;
      }
    `);
    newWindow.document.write('</style>');
    newWindow.document.write('</head><body>');
    
    newWindow.document.write('<div class="container">');

    newWindow.document.write('<div class="header">');
    newWindow.document.write('<img src="/images/logo.jpg" class="logo" alt="Company Logo">');
    newWindow.document.write('<h1>Invoice</h1>');
    newWindow.document.write('</div>');

    // Date and Time
    newWindow.document.write('<div class="date-time">');
    newWindow.document.write(`<p>${formattedDate}</p>`);
    newWindow.document.write(`<p>${formattedTime}:${milliseconds}</p>`);
    newWindow.document.write('</div>');

    newWindow.document.write('<table>');
    newWindow.document.write('<tr><th>Sl No.</th><th>Product Name</th><th>Price</th><th>Quantity</th><th>Total</th></tr>');
    
    cart.forEach((item, index) => {
      const priceString = item.price.replace('₹', '').trim();
      const price = parseFloat(priceString) || 0;
      const quantity = parseInt(item.quantity, 10) || 1; 
      const itemTotal = price * quantity;

      newWindow.document.write(`
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>₹${price.toFixed(2)}</td>
          <td>${quantity}</td>
          <td>₹${itemTotal.toFixed(2)}</td>
        </tr>
      `);
    });
    
    newWindow.document.write('</table>');
    newWindow.document.write(`<h3 class="total">Total Bill: ₹${total.toFixed(2)}</h3>`);

    // Customer Details
    newWindow.document.write('<div class="customer-details">');
    newWindow.document.write('<h2>Customer Details:</h2>');
    newWindow.document.write(`<p><strong>Name:</strong> ${customerDetails.name}</p>`);
    newWindow.document.write(`<p><strong>Phone:</strong> ${customerDetails.phone}</p>`);
    newWindow.document.write(`<p><strong>Address:</strong> ${customerDetails.address}</p>`);
    newWindow.document.write(`<p><strong>Pincode:</strong> ${customerDetails.pincode}</p>`);
    newWindow.document.write('</div>');
    
    // Payment Options
    newWindow.document.write('<div class="payment-options">');
    newWindow.document.write(`
      <button class="payment-button payment-upi" onclick="handlePayment('UPI')">Pay via UPI</button>
      <button class="payment-button payment-card" onclick="handlePayment('Card')">Pay via Card</button>
      <button class="payment-button payment-cash" onclick="handlePayment('Cash')">Pay via Cash</button>
    `);
    newWindow.document.write('</div>');

    // Print or Download Button
    newWindow.document.write('<div class="print-download">');
    newWindow.document.write('<button class="print-download-button" id="print-download-button">Print or Download</button>');
    newWindow.document.write('</div>');

    // Modal for Print/Download Options
    newWindow.document.write('<div class="modal" id="print-download-modal">');
    newWindow.document.write('<div class="modal-content">');
    newWindow.document.write('<p>Select an option:</p>');
    newWindow.document.write('<button class="print" id="print-button">Print</button>');
    newWindow.document.write('<button class="download" id="download-button">Download</button>');
    newWindow.document.write('</div>');
    newWindow.document.write('</div>');

    newWindow.document.write('<div class="footer">');
    newWindow.document.write('<p class="thank-you">Thank you for your purchase!</p>');
    newWindow.document.write('<p>Company Address | Phone Number | Website</p>');
    newWindow.document.write('</div>');

    newWindow.document.write('<script>');
    newWindow.document.write(`
      function handlePayment(method) {
        var paymentUrl = '';
        switch (method) {
          case 'UPI':
            paymentUrl = '/pay-upi.html';
            break;
          case 'Card':
            paymentUrl = '/pay-card.html';
            break;
          case 'Cash':
            paymentUrl = '/pay-cash.html';
            break;
        }
        window.open(paymentUrl, '_blank');

        document.querySelector('.confirmation-message').innerText = 'Paid via ' + method;
      }

      document.getElementById('print-download-button').addEventListener('click', function() {
        document.getElementById('print-download-modal').style.display = 'flex';
      });

      document.getElementById('print-button').addEventListener('click', function() {
        document.getElementById('print-download-modal').style.display = 'none';
        window.print();
      });

      document.getElementById('download-button').addEventListener('click', function() {
        document.getElementById('print-download-modal').style.display = 'none';
        document.querySelector('.payment-options').style.display = 'none';
        var invoiceHtml = document.documentElement.outerHTML;
        var blob = new Blob([invoiceHtml], {type: 'text/html'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.html';
        a.click();
        URL.revokeObjectURL(url);
        document.querySelector('.payment-options').style.display = 'block';
      });
    `);
    newWindow.document.write('</script>');

    newWindow.document.write('</div>'); 

    newWindow.document.write('</body></html>');
    newWindow.document.close(); 
  } else {
    console.error('Failed to open a new window.');
  }
};

export default proceedToCheckout;
