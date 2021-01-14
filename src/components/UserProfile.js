import React from 'react';
import axios from 'axios';
import '../App.css';
import ReservationsProfile from './ReservationsProfile';

const BASE_URL = 'http://localhost:3000/'

class UserProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user_id: 80,
        about_info:'',
        name:'',
        email_confirmed:false,
        identity_confirmed:false,
        reservations:[],
        reviews:[]
      }
    }


    componentDidMount(){
      axios.get(BASE_URL + '/users/' + this.state.user_id + '.json')
      .then((res)=> {
        console.log("data",res.data);
        this.setState({
          about_info:res.data[0].about_info,
          name:res.data[0].name,
          email_confirmed:res.data[0].email_confirmed,
          identity_confirmed:res.data[0].identity_confirmed,
          reservations:res.data[0].reservations,
          reviews:res.data[0].reviews
        })
      })
      .catch(console.warn)

    }

  render(){

    return(
      <div>
        <h1> Hi {this.state.name} </h1>

        <div>
          <h2> About me  </h2>

        <p>
          {this.state.about_info}

        </p>

          <div>
              <hr />
            <p>
              Email Confirmed: {

                this.state.email_confirmed === true? <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7C008000%7Cb%7CConfirmed' /> : <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7CFF0000%7Cb%7CNot Confirmed' />

               }

            </p>

            <p>
              Identity Confirmed: {

                this.state.identity_confirmed === true? <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7C008000%7Cb%7CConfirmed' /> : <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7CFF0000%7Cb%7CNot Confirmed' />

               }
            </p>
          </div>
          <hr />

          <div>
            {
              this.state.reservations.map((data,index)=>{
                <ReservationsProfile reservation={data}/>
              })
            }

          </div>


        </div>

      </div>


    )
  }
}

export default UserProfile
