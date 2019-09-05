import Axios from 'axios'

const axois = Axios.create({
    baseURL: 'http://dct-ticket-master.herokuapp.com'
});

export default axois;