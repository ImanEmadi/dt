import styles from './header.module.css'

export const Header = () => {
    return <>
        <div className={styles.box}>
            <div>
                <h1>Dt TODO APP !</h1>
                <h2>Keep a note of your tasks.</h2>
            </div>
        </div>
    </>;
}