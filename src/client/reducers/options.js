import {
  UPDATE_LANGUAGE,
  UPDATE_RESULT_FORMAT,
  UPDATE_MAP_MODE,
} from '../actions';

const DEFAULT_LANGUAGE = 'fi';
const DEFAULT_RESULT_FORMAT = 'table';
const DEFAULT_MAP_MODE = 'cluster';

export const INITIAL_STATE = {
  language: DEFAULT_LANGUAGE,
  resultFormat: DEFAULT_RESULT_FORMAT,
  mapMode: DEFAULT_MAP_MODE,
  strings: {
    no: {
      nameSampo: 'Norske stedsnavn',
      nameSampoDesc1: `Søk, analyser og visualiser stedsnavndata.`,
      nameSampoDesc2: `For å starte et søk, velg ønsket stedsnavntema fra menyen og skriv inn et stednavn. Alternativt kan du hente alle stedsnavn fra kartområdet.`,
      nameSampoDesc3: `Annvend jokertegn (*) for å søke på en del av et stednavn. For eksempel finner et søk på "Strand*" finner du alle navn stavet 'Strand-' og "*tjønn" alle navn stavet '-tjønn'`,
      nameSampoDesc3: `Søk kan også kombineres med ordet 'eller'. For eksempel kan "*tjønn eller tjern*" finne alle navn som slutter på '-tjønn' eller '-tjern'.`,
      selectDataSources: 'Velg stedsnavntema',
      results: 'resultat',
      result: 'resultat',
      filterResults: ', avgrens resultat med:',
      searchPlaceNames: 'Søk stedsnavn',
      searchByArea: 'Søk på område',
      searchByAreaTitle: 'Avgrens kartvisningen til søkeområdet. Sett zoomnivået til minst 11 og bruk søkeknappen nederst.',
      name: 'Navn',
      type: 'Type',
      area: 'Område',
      modifier: 'Tilpassing',
      base: 'Grunnlag',
      year: 'År',
      table: 'Tabel',
      clusteredMap: 'Klyngekart',
      markerMap: 'Punktkart',
      heatmap: 'Konsentrasjonskart',
      statistics: 'Statistikk',
      download: 'Nedlast',
      source: 'Kjelde',
      resultsAsCSV: 'resultat som csv fil',
      search: 'Søk...',
      tooManyResults: 'Over 5 000 søkeresultat, bruk klyngekart eller konsentrasjonskart.',
      wrongZoomLevel: 'Kartets zoomnivå må være minst 11.',
      feedback: 'Tilbakemelding'
    },
    en: {
      nameSampo: 'Norwegian place-names',
      nameSampoDesc1: `Search, analyse and visualise place-name data.`,
      nameSampoDesc2: `To start a search, select the desired place-naem theme from the menu and enter a place name. Alternatively, you can retrieve all place names from the map area.`,
      nameSampoDesc3: `Use wildcards (*) to search for part of a place name. For example, a search for "Strand*" will find all the names beginning with 'Strand-' and "*tjønn" all names ending in '-tjønn'.`,
      nameSampoDesc4: `Searching can also be combined with the word 'or'. For example, "*tjønn or *tjern*" will find any name ending in '-tjønn' or '-tjern'.`,
      selectDataSources: 'Select place-name theme',
      results: 'results',
      result: 'result',
      filterResults: ', filter results:',
      searchPlaceNames: 'Search place-names',
      searchByArea: 'Search within area',
      searchByAreaTitle: 'Adjust the map view to the area you wish to search. Set the zoom level to at least 11 and use the search button at the bottom.',
      name: 'Name',
      type: 'Type',
      area: 'Area',
      modifier: 'Modifier',
      base: 'Base',
      year: 'Year',
      table: 'Table',
      clusteredMap: 'Clustered map',
      markerMap: 'Point map',
      heatmap: 'Heatmap',
      statistics: 'Statistics',
      download: 'Download',
      source: 'Source',
      resultsAsCSV: 'result as csv-file',
      search: 'Search...',
      tooManyResults: 'More than 5,000 search results, use cluster map or heatmap.',
      wrongZoomLevel: 'The map zoom level must be at least 11.',
      feedback: 'Feedback'
    },

    fi: {
      nameSampo: 'Nimisampo: nimistöntutkijan työpöytä',
      nameSampoDesc1: `Nimisampo on kaikille avoin verkkopalvelu
      suomalaisesta paikannimistöstä kiinnostuneiden tutkijoiden ja
      suuren yleisön käytettäväksi. Nimistöä voi tarkastella kartoilla,
      datana ja tilastollisesti. Nykyisten karttapohjien ohella voi käyttää
      myös historiallisia luovutetun Karjalan karttoja ja 1900-luvun vaihteen
      venäläisiä Senaatin kartastoja eli Venäjän armeijan 1800–1900-luvulla
      laatimia Etelä-Suomen karttoja.`,
      nameSampoDesc2: `Aloita haku valitsemalla vasemmalta lähdeaineisto ja
      syöttämällä paikannimi. Vaihtoehtoisesti voit hakea kaikki paikannimet kartalta rajatulta alueelta.`,
      nameSampoDesc3: `Paikannimien haussa voi käyttää jokerimerkkiä (*), esimerkiksi
      haulla "orava*" löytyvät kaikki orava-alkuiset ja haulla "*haara" kaikki
      haara-loppuiset nimet.`,
      nameSampoDesc4: `Hakutermejä voi myös yhdistellä käyttämällä "or"-sanaa, esimerkiksi
      "ukko* or ukon*" löytää kaikki ukko- tai ukon-alkuiset nimet.`,
      selectDataSources: 'Valitse lähdeaineistot',
      results: 'hakutulosta',
      result: 'hakutulos',
      filterResults: ', suodata:',
      searchPlaceNames: 'Hae paikannimellä',
      searchByArea: 'Hae kaikki paikannimet alueelta',
      searchByAreaTitle: 'Siirrä karttanäkymä tutkittavalle alueelle, aseta zoomaustasoksi vähintään 11 ja käytä alareunan hakupainiketta.',
      name: 'Nimi',
      type: 'Paikanlaji',
      area: 'Alue',
      modifier: 'Määriteosa',
      base: 'Perusosa',
      year: 'Keruuvuosi',
      table: 'taulukko',
      clusteredMap: 'klusteroitu kartta',
      markerMap: 'kartta',
      heatmap: 'lämpökartta',
      statistics: 'tilastot',
      download: 'lataus',
      source: 'Lähde',
      resultsAsCSV: 'lataa hakutulokset csv-taulukkona',
      search: 'Hae...',
      tooManyResults: 'Hakutuloksia on yli 5000, jolloin täytyy käyttää joko klusteroitua karttaa tai lämpökartta.',
      wrongZoomLevel: 'Hakutuloksien suuren määrän johdosta kartan zoomaustason täytyy olla vähintään 11',
      feedback: 'Palaute'
    }
  }
};

const options = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return { ...state, language: action.language || DEFAULT_LANGUAGE };
    case UPDATE_RESULT_FORMAT:
      return { ...state, resultFormat: action.resultFormat || DEFAULT_RESULT_FORMAT };
    case UPDATE_MAP_MODE:
      return { ...state, mapMode: action.mapMode || DEFAULT_MAP_MODE };
    default:
      return state;
  }
};

export default options;
