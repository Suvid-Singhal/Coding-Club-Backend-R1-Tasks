const prompt = require('prompt-sync')();

function isNotValidDate(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
  
    if (isNaN(inputDate.getTime())) {
      return false;
    }
  
    if (inputDate > currentDate) {
      return true;
    }
  
    if (inputDate < new Date('1995-01-01')) {
      return true;
    }
  
    return false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {

    const apiKey = 'fn22gRuuLRYjK8QNGHVNKAQfdUPq9a6d';


    const from=prompt("Enter currency code to convert from: ");
    const to=prompt("Enter currency code to convert to: ");
    const amount=prompt("Enter amount: ");
    const date=prompt("Enter date: ");

    if (isNotValidDate(date)){
        console.log("Please enter a valid date!")
    }
    else{
        var myHeaders = new Headers();
        myHeaders.append("apikey", "fn22gRuuLRYjK8QNGHVNKAQfdUPq9a6d");

        var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'apikey': apiKey,
        }
        };

        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}&date=${date}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const ans=JSON.parse(result).result;
            console.log(`${amount} ${from} is equivalent to ${ans} ${to} as of ${date}`);
        }
        )
        .catch(error => console.log('error', error));
        
        await sleep(1000);
        console.log("Fetching latest currency data...");
        
        const symbols=require('./symbols.js');
        console.log(`${symbols}`)
        final_ans=[]
        for(let i=0;i<symbols.length;i++){
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${symbols[i]}&from=${from}&amount=${amount}&date=${date}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const ans=JSON.parse(result);
                final_ans.push({'Currency':symbols[i],'Amount Equivalent to Inputted Currency':ans.result});
            }
            )
            .catch(error => console.log('error', error));
            await sleep(1000);
        }
        console.table(final_ans);
        
        }
        
        
    }
    



main();