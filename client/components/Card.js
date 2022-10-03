import styles from '../styles/Home.module.scss'



export default function Card({ title, description, image, link }) {
    return (
        <a href={link} className={styles.outline}>
        <h2>{title}</h2>
        <p>{description}</p>
        <img src={image} alt={title} />
        </a>
    );
    }
    