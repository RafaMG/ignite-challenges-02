
import { MovieContextProvider } from './contexts/MovieContext';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieContextProvider>
        <SideBar />
        <Content />
      </MovieContextProvider>
    </div>
  );
}
