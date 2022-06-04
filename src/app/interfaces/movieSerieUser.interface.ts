export interface MovieSerie extends MovieSerieBase{
    backdrop_path:     string;
    original_language: string;
    original_title?:   string;
    overview:          string;
    release_date?:     Date;
    media_type:        string;
    
}
export interface MovieSerieBase {
    id:                number;
    name?:             string;
    poster_path:       string;
    title?:            string;
    vote_average:      number;


}
export interface MovieSeriesUser extends MovieSerieBase {
    idUser:            string;
}