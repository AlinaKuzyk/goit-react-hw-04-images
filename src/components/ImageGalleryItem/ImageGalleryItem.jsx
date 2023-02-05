import Modal from 'components/Modal/Modal';
import css from './GalleryItem.module.css';
import { useState } from 'react';

const GalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={handleModalToggle}
      />
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={handleModalToggle} />
      )}
    </li>
  );
};

// class GalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   handleModalToggle = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   render() {
//     return (
//       <li className={css.imageGalleryItem}>
//         <img
//           className={css.imageGalleryItem_image}
//           src={this.props.webformatURL}
//           alt={this.props.tags}
//           onClick={this.handleModalToggle}
//         />
//         {this.state.showModal && (
//           <Modal
//             largeImageURL={this.props.largeImageURL}
//             onModalClose={this.handleModalToggle}
//           />
//         )}
//       </li>
//     );
//   }
// }

export default GalleryItem;
