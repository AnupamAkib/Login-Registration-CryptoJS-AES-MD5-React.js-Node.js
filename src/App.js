import Header from './components/header';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';

import { Route } from "react-router-dom";
function App() {
  //let str=[];
  //for(let i=0; i<data.length; i++){
  //  str.push(<Card title={data[i].title} buttonName={data[i].buttonText} downloadLink={data[i].link} />);
  //}
  return (
    <div>
      <Header />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/sign_up">
        <SignUp />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </div>
  );
}

export default App;
