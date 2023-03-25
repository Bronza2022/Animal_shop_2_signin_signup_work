import './App.css';
import { Footer } from './components/Footer/Footer';
import { HeaderMemo as Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

function App() {
  console.log('Render App');

  return (
    <div className="container py-5">
      <Header />
      <hr />

      <Main />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
