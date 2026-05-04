import { useState } from "react";
import styles from "../components/maintext.module.css";
import SearchPopup from "../components/SearchPopup";
import SongCardPopup from "../components/SongCardPopup";
import LargeText from "../components/largetext";

const SPOTLIGHT_SONGS = [
    {
        title: "Stone in Love",
        artist: "Journey · Escape (1981)",
        image: "/journey.jpeg",
        description: "A soaring anthem about youthful romance and the bittersweet nostalgia of first love, built on Neal Schon's iconic guitar and Steve Perry's powerhouse vocals.",
    },
    {
        title: "Bohemian Rhapsody",
        artist: "Queen · A Night at the Opera (1975)",
        image: "/gnr.jpg",
        description: "A genre-defying six-minute epic blending ballad, opera, and hard rock. Freddie Mercury's magnum opus remains one of the most ambitious songs ever recorded.",
    },
    {
        title: "Hard To Explain",
        artist: "The Strokes · Is This It (2001)",
        image: "/strokes.jpg",
        description: "Jittery guitars and Julian Casablancas's detached drawl defined a generation of indie rock. A snapshot of downtown New York cool at the turn of the millennium.",
    },
];

const POPULAR_RELEASES = [
    { title: "Good Times Bad Times", artist: "Led Zeppelin",    image: "/Led_Zeppelin_-_Led_Zeppelin_cover.jpg", spotifyUrl: "https://open.spotify.com/embed/track/0QwZfbw26QeUoIy82Z2jYp?utm_source=generator" },
    { title: "Stone in Love",        artist: "Journey",          image: "/journey.jpeg",                         spotifyUrl: "https://open.spotify.com/embed/track/5LyFTf7KMD3CsRA7B5gzEm?utm_source=generator" },
    { title: "Human Nature",         artist: "Michael Jackson",  image: "/thriller.jpg",                         spotifyUrl: "https://open.spotify.com/embed/track/4cgjA7B4fJBHyB9Ya2bu0t?utm_source=generator" },
    { title: "Sweet Child O' Mine",  artist: "Guns N' Roses",   image: "/gnr.jpg",                              spotifyUrl: "https://open.spotify.com/embed/track/7snQQk1zcKl8gZ92AnueZW?utm_source=generator" },
];

const NEW_RELEASES = [
    { title: "Hard To Explain", artist: "The Strokes",    image: "/strokes.jpg", spotifyUrl: "https://open.spotify.com/embed/track/6ljsIKKZfyEuQqMXincQZQ?utm_source=generator" },
    { title: "Arabella",        artist: "Arctic Monkeys",          image: "/am.jpeg",                         spotifyUrl: "https://open.spotify.com/embed/track/7nzsY8vlnKdvGOEE0rjAXZ?utm_source=generator"  },
    { title: "Champagne Supernova",         artist: "Oasis",  image: "/oasis.jpeg",                         spotifyUrl: "https://open.spotify.com/embed/track/6EMynpZ10GVcwVqiLZj6Ye?utm_source=generator" },
    { title: "1901",  artist: "Phoenix",   image: "/phoenix.jpeg",                              spotifyUrl: "https://open.spotify.com/embed/track/68hYdj3GepWm2R202KhJT7?utm_source=generator" },
]


const Music = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [selectedRelease, setSelectedRelease] = useState<typeof POPULAR_RELEASES[0] | null>(null);
    const [spotlightIndex, setSpotlightIndex] = useState(0);

    const prevSpotlight = () => setSpotlightIndex(i => (i - 1 + SPOTLIGHT_SONGS.length) % SPOTLIGHT_SONGS.length);
    const nextSpotlight = () => setSpotlightIndex(i => (i + 1) % SPOTLIGHT_SONGS.length);
    const spotlight = SPOTLIGHT_SONGS[spotlightIndex];

    return (
        <div className={styles.music_page}>
            <div className={styles.large_text} style={{ padding: "2rem 2rem 1rem 0" }}>Music</div>

            <div className={styles.search_bar_wrapper}>
                <span className={styles.search_icon}>&#128269;</span>
                <input
                    className={styles.search_bar}
                    type="text"
                    placeholder="Search songs..."
                    readOnly
                    onClick={() => setSearchOpen(true)}
                    style={{ cursor: "pointer" }}
                />
            </div>

            <div className={styles.section_header}>Popular Releases</div>

            <div className={styles.album_grid}>
                {POPULAR_RELEASES.map(release => (
                    <div key={release.title} className={styles.album_card} onClick={() => setSelectedRelease(release)}>
                        <img className={styles.album_image} src={release.image} alt={release.title} />
                        <div className={styles.album_info}>
                            <p className={styles.album_title}>{release.title}</p>
                            <p className={styles.album_artist}>{release.artist}</p>
                        </div>
                    </div>
                ))}
            </div>

            

            <div style = {{margin: "100px"}}>
            </div>

            <div className={styles.section_header}> New Releases</div>

            <div className={styles.album_grid}>
                {NEW_RELEASES.map(release => (
                    <div key={release.title} className={styles.album_card} onClick={() => setSelectedRelease(release)}>
                        <img className={styles.album_image} src={release.image} alt={release.title} />
                        <div className={styles.album_info}>
                            <p className={styles.album_title}>{release.title}</p>
                            <p className={styles.album_artist}>{release.artist}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style = {{margin: "100px"}}>
            </div>

            <LargeText link="Spotlight" />

            <div className={styles.spotlight_section}>
                <button className={styles.spotlight_arrow} onClick={prevSpotlight}>&#8592;</button>

                <div className={styles.spotlight_card}>
                    <img className={styles.spotlight_card_image} src={spotlight.image} alt={spotlight.title} />
                </div>

                <div className={styles.spotlight_description}>
                    <p className={styles.spotlight_song_title}>{spotlight.title}</p>
                    <p className={styles.spotlight_song_artist}>{spotlight.artist}</p>
                    <p className={styles.spotlight_song_text}>{spotlight.description}</p>
                    <div className={styles.spotlight_dots}>
                        {SPOTLIGHT_SONGS.map((_, i) => (
                            <span
                                key={i}
                                className={i === spotlightIndex ? styles.spotlight_dot_active : styles.spotlight_dot}
                                onClick={() => setSpotlightIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <button className={styles.spotlight_arrow} onClick={nextSpotlight}>&#8594;</button>
            </div>



            {selectedRelease && (
                <SongCardPopup onClose={() => setSelectedRelease(null)}>
                    <iframe
                        style={{ borderRadius: "12px", border: "none" }}
                        src={selectedRelease.spotifyUrl}
                        width="100%"
                        height="352"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        allowFullScreen
                    />
                </SongCardPopup>
            )}

            {searchOpen && <SearchPopup onClose={() => setSearchOpen(false)} />}
            
        </div>
    );
};


export default Music;
