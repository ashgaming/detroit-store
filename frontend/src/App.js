import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Footer from './Components/Footer';
import Headers from './Components/Headers';
import AboutUs from './screens/AboutUs';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import SetTheme from './Components/SetTheme';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';



function App() {
  /*const {colorTheme} = useSelector(state=>state.colorTheme)
  const { color,backgroundColor,navColor,navBackgound } = colorTheme
  */
  const theme = {
    width: '100%',
    minHeight: '99vh',
    maxHeight: '1000vh',
    backgroundColor: '#2c2c2c',
    color: 'red',

  }


  return (
    <div className="App" style={theme}>
      <Router history>
        <Headers />
        <Routes>
          <Route path='' element={<HomeScreen />} exact />
          <Route path='/set' element={<SetTheme />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/about' Component={AboutUs} />
          <Route path='/Product/:id' Component={ProductScreen} />
          <Route path='/Profile' Component={ProfileScreen} />
          <Route path='/Shipping' Component={ShippingScreen} />
          <Route path='/cart/:id?' Component={CartScreen} />
          <Route path='/order/:id' Component={OrderScreen} />
          <Route path='/admin/orderlist/' Component={OrderListScreen} />
          <Route path='/admin/userlist' Component={UserListScreen} />
          <Route path='/admin/productlist' Component={ProductListScreen} />
          <Route path='/admin/user/:id/edit' Component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' Component={ProductEditScreen} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
