// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e) {
  console.log('Calculating...')

  // UI variables
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthly_payment = document.getElementById('monthly-payment');
  const UItotal_payment = document.getElementById('total-payment');
  const UItotal_interest = document.getElementById('total-interest');

  const principal = parseFloat(UIamount.value);
  const calculated_interest = parseFloat(UIinterest.value) / 100 / 12;
  const calculated_payments = parseFloat(UIyears.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculated_interest, calculated_payments);
  const monthly = (principal * x * calculated_interest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthly_payment.value = monthly.toFixed(2);
    UItotal_payment.value = (monthly * calculated_payments).toFixed(2);
    UItotal_interest.value = ((monthly * calculated_payments) - principal).toFixed(2);
  } else {
    showError('Check your numbers');
  }

  e.preventDefault();
}

// Show Error
function showError(error) {
  // create a div 
  const error_div = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');


  // Add class
  error_div.className = 'alert alert-danger';

  // Create text node and append to div
  error_div.appendChild(document.createTextNode(error));

  // insert error above heading 
  card.insertBefore(error_div, heading);

  // Clear error after 3 seconds 
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
