import { useState } from "react";
import styles from "../components/maintext.module.css";

const PERFORMANCES = [
    {
        date: "May\n8th",
        concert: "/concert1.jpg",
        bandPhoto: "/band_cover1.png",
        artist: "Led Zeppelin",
        venue: "Madison Square Garden, New York",
    },
    {
        date: "Jun\n14th",
        concert: "/concert2.jpg",
        bandPhoto: "/band_cover2.webp",
        artist: "Def Leppard",
        venue: "LA Forum, Los Angeles",
    },
    {
        date: "Jul\n22nd",
        concert: "/concert3.jpg",
        bandPhoto: "/band_cover3.webp",
        artist: "Queen",
        venue: "Wembley Stadium, UK",
    },
];

const Performances = () => {
    const [index, setIndex] = useState(0);
    const show = PERFORMANCES[index];

    const prev = () => setIndex(i => (i - 1 + PERFORMANCES.length) % PERFORMANCES.length);
    const next = () => setIndex(i => (i + 1) % PERFORMANCES.length);

    return (
        <div className={styles.music_page}>

           
            <div className={styles.large_text} style={{ padding: "2rem 2rem 1rem 0" }}>Performances</div>

             <div style = {{margin: "20px"}}>

            </div>

            <div className={styles.perf_slideshow}>
                <button className={styles.spotlight_arrow} onClick={prev}>&#8592;</button>

                <div className={styles.perf_card}>
                    <div className={styles.perf_date_badge}>
                        {show.date.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
                    </div>
                    <a href = "https://www.ticketmaster.com/" target="_blank">
                    <img src={show.concert} alt={show.venue} className={styles.perf_concert_img} />
                    </a>
                    <div className={styles.perf_label}>
                        <p className={styles.perf_artist}>{show.artist} @</p>
                        <p className={styles.perf_venue}>{show.venue}</p>
                    </div>
                    <img src={show.bandPhoto} alt={show.artist} className={styles.perf_band_circle} />
                </div>

                <button className={styles.spotlight_arrow} onClick={next}>&#8594;</button>
            </div>

            <div className={styles.spotlight_dots} style={{ justifyContent: "center", marginTop: "1.5rem" }}>
                {PERFORMANCES.map((_, i) => (
                    <span
                        key={i}
                        className={i === index ? styles.spotlight_dot_active : styles.spotlight_dot}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Performances;
