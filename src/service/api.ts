import axios from 'axios';

function CallApi(config: any) {
  // console.log("aqac")

  // const user = useAppSelector(state => state.user.userData.user);
  let configWithloginToken = { ...config };

  let token = localStorage.getItem('token');
  const headers = {
    Authorization: token == null ? 'Bearer' : `Bearer ${token}`,
  };

  console.log('configWithloginTokenconfigWithloginToken',configWithloginToken)

  configWithloginToken.headers = headers;
  console.log('headers9966',configWithloginToken);
  return axios
    .request(configWithloginToken)
    .then(response => {
      console.log('responseresponse1212',response)
      if(response.headers.accesstoken){
        localStorage.setItem('token',response.headers.accesstoken)
      }
      return response;
    })
    .then(({ data }) => data)
    .catch(error => {
      console.log('error.response',error.response)
      if (error.response?.status === 401) {
        localStorage.removeItem('token');

        // navigate('/login');

        console.log('121211212');
        window.location.reload();
      }
      return Promise.reject(error);
    });
}

export default CallApi;
