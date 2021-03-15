import {Route, Redirect} from 'react-router-dom';
import { authenticateGet } from '../api/api';

class AsyncPrivateRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            isAuthenticated: false,
          }
    }

    componentDidMount() {

      authenticateGet()
      .then((data)=>{

        console.log(data);

        setTimeout(()=>{
            this.setState({
                loading: false,
                isAuthenticated: data.auth,
              });
        }, 2000);

        this.props.setUsername(data.username);

      })

    }

    render() {
      const { component: Component, ...rest } = this.props;
      if (this.state.loading) {
        return (
        <div className="loader">
            LOADING
          <div>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>);
      } else {
        return (
            <Route {...rest} render={(props) => (
                this.state.isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />
            )} />
        );
      }
    }
}

export default AsyncPrivateRoute;

