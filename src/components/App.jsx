import Searchbar from './Searchbar/Searchbar';
import Gallery from './ImageGallery/ImageGallery';
import css from './App.module.css';
import { useState } from 'react';

export const App = () => {
  const [searchText, setSearchText] = useState('');

  // передаем значения инпута из формы в Searchbar в State App
  const handleSearch = searchText => {
    setSearchText(searchText);
  };

  return (
    <div className={css.app}>
      {/* onSubmit это пропс, который мы потом передадим форме в Searchbar */}
      <Searchbar onSubmit={handleSearch} />
      {/* image прокидывает пропсом то, что мы ввели в инпут в форме */}
      <Gallery image={searchText} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     searchText: '',
//   };
//   // передаем значения инпута из формы в Searchbar в State App
//   handleSearch = searchText => {
//     this.setState({ searchText });
//   };

//   render() {
//     return (
//       <div className={css.app}>
//         {/* onSubmit это пропс, который мы потом передадим форме в Searchbar */}
//         <Searchbar onSubmit={this.handleSearch} />
//         {/* image прокидывает пропсом то, что мы ввели в инпут в форме */}
//         <Gallery image={this.state.searchText} />
//       </div>
//     );
//   }
// }
