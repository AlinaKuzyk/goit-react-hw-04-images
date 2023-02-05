import { useEffect } from 'react';

import css from './Modal.module.css';

const Modal = ({ onModalClose, largeImageURL }) => {
  useEffect(() => {
    const handleEscCloseModal = event => {
      if (event.code === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleEscCloseModal);

    return () => {
      window.removeEventListener('keydown', handleEscCloseModal);
    };
  }, [onModalClose]);

  const handleCloseOnBackdrop = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleCloseOnBackdrop}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="big_picture" />
      </div>
    </div>
  );
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscCloseModal);
//   }

//   handleEscCloseModal = event => {
//     if (event.code === 'Escape') {
//       this.props.onModalClose();
//     }
//   };

//   handleCloseOnBackdrop = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onModalClose();
//     }
//   };

//   render() {
//     return (
//       <div className={css.overlay} onClick={this.handleCloseOnBackdrop}>
//         <div className={css.modal}>
//           <img src={this.props.largeImageURL} alt="big_picture" />
//         </div>
//       </div>
//     );
//   }
// }

export default Modal;
