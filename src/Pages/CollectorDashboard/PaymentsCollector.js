import { useState , useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import axios from 'axios'

function PaymentsCollector() {
    const { contextData } = useContext(AuthContext);
    const [ collectorId, setCollectorId] = useState();
    const [ paymentDetails, setPaymentDetails] = useState({});
    const [ getPayment, setGetPayment] = useState(false);


    async function getCollectorID(id)  {
        try {
           await axios.get(`http://127.0.0.1:8000/collector/getbyid/${id}`)
        .then((res) => {
            setCollectorId(res.data.id);
        })
        } catch (error) {
            console.log(error);
        }
    }

    


    useEffect(() => {
        getCollectorID(contextData.user.userid);
    }, [])


  return (
    <div>PaymentsCollector</div>
  )
}

export default PaymentsCollector