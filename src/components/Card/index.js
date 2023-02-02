import React from "react";
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from "../../context";


function Card({
                  id,
                  title,
                  imageUrl,
                  price,
                  onFavorite,
                  onPlus,
                  favorited,
                  loading

              }) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price});
    };

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {loading ? (<ContentLoader
                    speed={2}
                    width={160}
                    height={195}
                    viewBox="0 0 160 195"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="160" height="90"/>
                    <rect x="0" y="98" rx="5" ry="5" width="160" height="15"/>
                    <rect x="0" y="118" rx="5" ry="5" width="100" height="15"/>
                    <rect x="0" y="163" rx="5" ry="5" width="80" height="25"/>
                    <rect x="127" y="158" rx="10" ry="10" width="32" height="32"/>
                </ContentLoader>
            ) : (
                <>
                    {onFavorite && (
                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? '/img/heart.svg' : '/img/unliked.svg'}/>
                        </div>
                    )}
                    <img width={90} height={95} src={imageUrl} alt="Goods"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} грн.</b>
                        </div>
                        {onPlus && (
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                                alt="Plus"
                            />
                        )}
                    </div>
                </>
            )}

        </div>
    );
};

export default Card;