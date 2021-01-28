import React from 'react'
import ReactDOM from "react-dom";
import braintree from 'braintree-web'
import CardLogo from './card-logo.png'
class Braintree extends React.Component {

  state = {
    hostedFields: {},
    submitValue: 'Pay with Card',
    submitDisabled: true
  }

  componentDidMount = () => {

    const stylesConfig = {
  		'input': {
  		  'font-size': '18px',
  		  'color': '#17a2b8'
  		},
  		'input.invalid': {
  		  'color': 'red'
  		},
  		'input.valid': {
  		  'color': 'green'
  		}
  	};

  	const fieldsConfig = {
  		cardholderName: {
  			selector: '#cardholder-name',
  			placeholder: 'John Doe'
  		},
  		number: {
  		  selector: '#card-number',
  		  placeholder: '4111 1111 1111 1111'
  		},
  		cvv: {
  		  selector: '#cvv',
  		  placeholder: '123'
  		},
  		expirationDate: {
  		  selector: '#expiration',
  		  placeholder: 'MM/YY'
  		}
  	};

    //create braintree client
  	const clientCreated = braintree.client.create({ authorization: 'sandbox_q7bzcx2z_qjd7x8wgzkgmfrz5' });

  	//setup card payment
  	const hostedFields = clientCreated.then(client => {
  	  return braintree.hostedFields.create({
    		client: client,
    		styles: stylesConfig,
    		fields: fieldsConfig
  	  });
  	})

    hostedFields.then(hostedFields => {

  		hostedFields.on('cardTypeChange', event => {
  			if (event.cards.length === 1) {

  				if (event.cards[0].code.size === 4) {
  					hostedFields.setAttribute({
  						field: 'cvv',
  						attribute: 'placeholder',
  						value: '1234'
  					});

  				} else {
  					hostedFields.setAttribute({
  						field: 'cvv',
  						attribute: 'placeholder',
  						value: '123'
  					});
  				}
  			}

  		});

      this.setState({
        hostedFields: hostedFields,
        submitDisabled: false
      })

  	})
  	.catch(function(hostedFieldsErr){
  		if (hostedFieldsErr) {
  			console.error(hostedFieldsErr);
  			return;
  		}
  	});
  }

  handleSubmit = e => {
    e.preventDefault();

    const state = this.state.hostedFields.getState();
    const formValid = Object.keys(state.fields).every(key =>
      state.fields[key].isValid
    );

    if(formValid){
      this.setState({
        submitValue: 'Processing...',
        submitDisabled: true
      })

      const cardholderName = 'John Doe' //hard coded for simplicity :)

      this.state.hostedFields.tokenize({ cardholderName: cardholderName }).then(payload => {
        // send payload.nonce to server
        this.props.processPayment(payload.nonce)
      }).catch(console.warn);

    } else {
      alert('Your payment details are invalid.')
    }
  }


  render(){
    return(
      <div className="braintree">
        <div>
          <img src={CardLogo} alt="" className="card-logo"/>
        </div>
        <form onSubmit={ this.handleSubmit }>

          <label htmlFor="cardholder-name">Name on Card</label>
          <div id="cardholder-name"></div>

          <label htmlFor="card-number">Card Number</label>
          <div id="card-number"></div>

          <label htmlFor="cvv">CVV</label>
          <div id="cvv"></div>

          <label htmlFor="expiration">Expiration Date</label>
          <div id="expiration"></div>

          <input className="button" id="pay" type="submit" value={this.state.submitValue} disabled={this.state.submitDisabled}/>
        </form>
      </div>
    )
  }
}

export default Braintree
