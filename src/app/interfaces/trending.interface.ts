export interface Trending {
    adult?:            boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    original_language: string;
    original_title?:   string;
    poster_path:       string;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    overview:          string;
    release_date?:     Date;
    title?:            string;
    id:                number;
    popularity:        number;
    media_type:        string;
    name?:             string;
    original_name?:    string;
    origin_country?:   string[];
    first_air_date?:   Date;
}
