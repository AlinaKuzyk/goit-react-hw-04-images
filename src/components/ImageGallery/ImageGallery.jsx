import fetchApi from '../../api';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Spinner from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './Gallery.module.css';
import { useState, useEffect, useRef } from 'react';

export const Gallery = ({ image }) => {
  const [pictures, setPictures] = useState([]);
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState('idle');

  const isFirstRender = useRef(true);

  useEffect(() => {
    // пропускаем первый рендер, так как еще нет никакого http запроса
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStatus('pending');

    async function getData() {
      try {
        const pictures = await fetchApi(image);
        if (pictures.length === 0) {
          setPictures(pictures);
          setStatus('rejected');
          return alert('Sorry...there are no images for your request.');
        }
        setPictures(pictures);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    }
    if (image !== '') {
      getData();
    } else {
      setStatus('idle');
    }
  }, [image]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    async function getData() {
      const newPage = await fetchApi(image, amount);
      setPictures([...pictures, ...newPage]);
    }
    getData();
    //  eslint-disable-next-line
  }, [amount]);

  const handleLoadMore = () => {
    setAmount(amount + 1);
  };

  return (
    <>
      {status === 'idle'}
      {status === 'resolved' && (
        <>
          <ul className={css.imageGallery}>
            {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <GalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
          <Button onClick={handleLoadMore} />
        </>
      )}
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && <p>Try find something else!</p>}
    </>
  );
};

//  if (prevState.amount !== this.state.amount && prevImage === newImage) {
//    fetchApi(newImage, this.state.amount)
//      .then(response => {
//        if (response.ok) {
//          return response.json();
//        }
//      })
//      .then(data => {
//        this.setState({
//          pictures: [...this.state.pictures, ...data.hits],
//          status: 'resolved',
//        });
//      });
//  }

// export class Gallery extends Component {
//   state = {
//     pictures: [],
//     amount: 1,
//     status: 'idle',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevImage = prevProps.image;
//     const newImage = this.props.image;

//     if (prevImage !== newImage) {
//       this.setState({ status: 'pending' });
//       fetchApi(newImage, this.state.amount)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//         })
//         .then(data => {
//           console.log(data.hits.length);
//           console.log(data.total);
//           if (data.hits.length === 0) {
//             this.setState({ pictures: [], status: 'rejected' });
//             return alert('There are no images for your request.');
//           }
//           if (data.hits.length > 0 && data.hits.length < 12) {
//             this.setState({ pictures: [], status: 'rejected' });
//             return alert('Ouupss...no more pictures');
//           }
//           this.setState({ pictures: data.hits, status: 'resolved' });
//         });
//     }

//     if (prevState.amount !== this.state.amount && prevImage === newImage) {
//       fetchApi(newImage, this.state.amount)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//         })
//         .then(data => {
//           this.setState({
//             pictures: [...this.state.pictures, ...data.hits],
//             status: 'resolved',
//           });
//         });
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevstate => ({ amount: prevstate.amount + 1 }));
//   };

//   render() {
//     const { status } = this.state;

//     if (status === 'pending') {
//       return <Spinner />;
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <ul className={css.imageGallery}>
//             {this.state.pictures.map(({ id, webformatURL, largeImageURL }) => {
//               return (
//                 <GalleryItem
//                   key={id}
//                   webformatURL={webformatURL}
//                   largeImageURL={largeImageURL}
//                 />
//               );
//             })}
//           </ul>
//           <Button onClick={this.handleLoadMore} />
//         </>
//       );
//     }
//   }
// }

export default Gallery;
