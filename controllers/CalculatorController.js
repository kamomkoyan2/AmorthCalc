// const puppeteer = require('puppeteer');
const pdf = require('html-pdf')

const amortizateCalc = (req, res) => {
    res.render('index', {
        title: 'Home Page',
        isHome: true
    })
};

const handleForm = (req, res) => {
    const { principal_amount, annaul_interest_rate, balloon_payment, number_of_regular_payments, payment_amount, payments_per_year  } = req.body;


    let principal_borrowed = principal_amount;

    //Calculate the per monthly interest rate
    let periodig_interest_rate = annaul_interest_rate / payments_per_year;

    let regular_payment_amount = payment_amount;


  //  let Total_repaid = principal_borrowed+Total_interest_paid

    let Annaul_Payments = payments_per_year
    //Interst only paymnent monthly
   // let Interst_only_payment = (periodig_interest_rate/payments_per_year)*principal_amount

    let Annaul_interest_rate = annaul_interest_rate;


    let Montly_Payment = principal_amount*periodig_interest_rate/100*(1+periodig_interest_rate/100)^number_of_regular_payments/(1+periodig_interest_rate/100)^number_of_regular_payments-1

    let Total_Interest = Montly_Payment * number_of_regular_payments;
    let Total_Interest_Paid = (Total_Interest-principal_borrowed) * -1;
    let total_repaid = Total_Interest_Paid + principal_borrowed;

    res.send({

        principal_borrowed,
        regular_payment_amount,
        periodig_interest_rate,
        //Interst_only_payment,
        //Total_repaid,
        Annaul_Payments,
        Annaul_interest_rate,
        Montly_Payment,
        Total_Interest_Paid,
        total_repaid

    });
    console.log(req.body)
}


const createPdf = (req,res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
            res.send(Promise.resolve());
    });
}

const fetchPdf = (req,res) => {
    res.sendFile(`${__dirname}/result.pdf`)
}


module.exports = {
    amortizateCalc,
    handleForm,
    createPdf,
    fetchPdf
}









// exports.amortizateCalc = function getValues()
// {
//     // button click gets values from inputs
//     // var balance = parseFloat(document.getElementById("principal").value);
//     // var interestRate = parseFloat(document.getElementById("interest").value/100.0);
//     // var terms = parseInt(document.getElementById("terms").value);
//     // var balloon = parseInt(document.getElementById('balloon').value);
//     // var regPayments = parseInt(document.getElementById('regpayments').value);
//     // var perYear = parseInt(document.getElementById('peryear').value);
//
//     //set the div string
//     // let div = document.getElementById("Result");
//
//     //in case of a re-calc, clear out the div!
//     // div.innerHTML = "";
//
//     //validate inputs - display error if invalid, otherwise, display table
//     let balVal = validateInputs(balance);
//     let intrVal = validateInputs(interestRate);
//
//     if (balVal && intrVal)
//     {
//         //Returns div string if inputs are valid
//         div.innerHTML += amort(balance, interestRate, terms, balloon, perYear, regPayments, );
//     }
//     else
//     {
//         //returns error if inputs are invalid
//         div.innerHTML += "Please Check your inputs and retry - invalid values.";
//     }
// }
//
// /**
//  * Amort function:
//  * Calculates the necessary elements of the loan using the supplied user input
//  * and then displays each months updated amortization schedule on the page
//  */
// function amort(balance, interestRate, terms, balloon, perYear)
// {
//     //Calculate the per month interest rate
//     let monthlyRate = interestRate/12;
//
//     //Calculate the payment
//     let payment = balance * (monthlyRate/(1-Math.pow(
//         1+monthlyRate, -terms)));
//
//
//     //begin building the return string for the display of the amort table
//     let result = "Principal borrowed: $" + balance.toFixed(2) +  "<br />" +
//         "Regular Payment Amount: $"  + perYear.toFixed(2) + "<br />" +
//         "Finall Balloon Payment: $" + balloon.toFixed(2) + "<br />" +
//         "Interest rate: " + (interestRate*100).toFixed(2) + "%<br />" +
//         "Number of months: " + terms + "<br />" +
//         "Monthly payment: $" + payment.toFixed(2) + "<br />" +
//         "Total paid: $" + (payment * terms).toFixed(2) + "<br />" +
//         "Total interest Paid: $" + interestRate/balance*terms.toFixed(2) + "<br /><br />"
//
//     //add header row for table to return string
//     result += "<table border='1'><tr><th>Pmt </th><th>Principal</th>" +
//         "<th>Interest</th><th>Cum Pin</th><th>Cum int</th><th>Prin Bal</th>";
//
//     /**
//      * Loop that calculates the monthly Loan amortization amounts then adds
//      * them to the return string
//      */
//     for (let count = 0; count < terms; ++count)
//     {
//         //in-loop interest amount holder
//         let interest = 0;
//
//         //in-loop monthly principal amount holder
//         let monthlyPrincipal = 0;
//
//         //start a new table row on each loop iteration
//         result += "<tr align=center>";
//
//         //display the month number in col 1 using the loop count variable
//         result += "<td>" + (count + 1) + "</td>";
//
//
//         //code for displaying in loop balance
//         result += "<td> $" + balance.toFixed(2) + "</td>";
//
//         //calc the in-loop interest amount and display
//         interest = balance * monthlyRate;
//         result += "<td> $" + interest.toFixed(2) + "</td>";
//
//         //calc the in-loop monthly principal and display
//         monthlyPrincipal = payment - interest;
//         result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";
//
//         //end the table row on each iteration of the loop
//         result += "</tr>";
//
//         //update the balance for each loop iteration
//         balance = balance - monthlyPrincipal;
//     }
//
//     //Final piece added to return string before returning it - closes the table
//     result += "</table>";
//
//     //returns the concatenated string to the page
//     return result;
// }
//
// function validateInputs(value) {
//     //some code here to validate inputs
//     if ((value == null) || (value == "")) {
//         return false;
//     } else {
//         return true;
//     }
// }
//
// // document.addEventListener('DOMContentLoaded', function() {
// //     let  elems = document.querySelectorAll('select');
// //     let instances = M.FormSelect.init(elems, {});
// // });