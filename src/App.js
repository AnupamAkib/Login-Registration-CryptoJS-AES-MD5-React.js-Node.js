import Header from './components/header';
import Input from './components/input';
import Profile from './components/profile';
import Tmp from './components/tmp';
import data from './data.json';
import { Route } from "react-router-dom";
function App() {
  //let str=[];
  //for(let i=0; i<data.length; i++){
  //  str.push(<Card title={data[i].title} buttonName={data[i].buttonText} downloadLink={data[i].link} />);
  //}
  return (
    <div>
      <Header />
      <Route exact path="/">
        <Input />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </div>
  );
}

export default App;
