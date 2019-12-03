module.exports = {  
  'bustadnamn': {
    'title': 'Bustadnamnregisteret',
    'shortTitle': 'BNR',
    'timePeriod': '1950-54',
    'endpoint': 'http://158.39.48.37/stedsnavn-data/query',
    
    // 'suggestionQuery': `
    //   PREFIX text: <http://jena.apache.org/text#>
    //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //   PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    //   PREFIX gs: <http://www.opengis.net/ont/geosparql#>
    //   SELECT DISTINCT ?label (COUNT(?id) AS ?count)
    //   WHERE {
    //     GRAPH <http://ldf.fi/warsa/places/karelian_places> {
    //       (?id ?idcore) text:query (skos:prefLabel '<QUERYTERM>*') .
    //     }
    //     ?id skos:prefLabel ?lbl .
    //     BIND(STR(?lbl) AS ?label)
    //   }
    //   GROUP BY ?label
    //   ORDER BY DESC(MAX(?idcore)) ?label
    //   LIMIT 50
    //   `,
    'simpleSuggestionQuery': `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prEFIX text: <http://jena.apache.org/text#>
    PREFIX ecrm: <http://erlangen-crm.org/current/>
    PREFIX spatial: <http://jena.apache.org/spatial#>

    
    SELECT distinct ?id
    WHERE {
      GRAPH <http://data.stadnamn.uib.no/stedsnavn/bustadnamnregisteret>
      {  
        <:> 
        ?id a ecrm:E53_Place .  
        }
      }       
        `,
    'resultQuery': `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX text: <http://jena.apache.org/text#>
    PREFIX ecrm: <http://erlangen-crm.org/current/>
    PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX spatial: <http://jena.apache.org/spatial#>
        
    SELECT distinct ?id (?identifier as ?broaderTypeLabel) ?prefLabel ?kommune_uri ?fylke_uri ?broaderAreaLabel ?source ?markerColor ?type_uri ?lat ?long ?manifest 
    WHERE {
      SERVICE <http://158.39.48.37/stedsnavn-vocab> {
        GRAPH <http://data.stadnamn.uib.no/skos/navneliste> {
          ?type_uri dct:identifier ?identifier.
          VALUES (?identifier) {("bruk") ("gard")}.
          ?vokab_fylke dct:identifier "fylke".
          ?vokab_kommune dct:identifier "kommune". 
          }
        }
        GRAPH <http://data.stadnamn.uib.no/stedsnavn/bustadnamnregisteret>
        {
          {
            SELECT ?id ?prefLabel WHERE {
              <QUERY>
              ?id rdfs:label ?prefLabel ;
              a ecrm:E53_Place .
              FILTER ( NOT EXISTS {?id ecrm:P10_contains ?contains.} )
              }
          }
          OPTIONAL {   ?id ecrm:P131_is_identified_by ?Note.
            ?Note <http://erlangen-crm.org/current/P2_has_type> <http://vocab.getty.edu/page/aat/300027201> .
            ?Note ecrm:P129i_is_subject_of ?manifest.
            ?manifest dct:conformsTo "http://iiif.io/api/presentation".
            }
            
        ?id ecrm:P10_falls_within* ?fylke_uri;
        ecrm:P10_falls_within* ?kommune_uri.
        ?id ecrm:P2_has_type ?type_uri.
        BIND ("BNR" AS ?source)  
        BIND ("yellow" AS  ?markerColor)
        OPTIONAL {
          ?id wgs84:lat ?lat.
          ?id wgs84:long ?long.
        }
        ?fylke_uri ecrm:P2_has_type ?vokab_fylke;      
        rdfs:label ?fylke_label.
        ?kommune_uri ecrm:P2_has_type ?vokab_kommune;
        rdfs:label ?kommune_label.
        BIND (CONCAT(?kommune_label, ", ",?fylke_label) AS ?broaderAreaLabel)

      }
    }

      `,
  },
  'sognogfjordane': {
    'title' : 'Stadnamn i Sogn og Fjordane',
    'shortTitle': 'SOF',
    'timePeriod': '1930-',
    'endpoint': 'http://158.39.48.37/stedsnavn-sof-data/query',
    'simpleSuggestionQuery': `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prEFIX text: <http://jena.apache.org/text#>
    PREFIX ecrm: <http://erlangen-crm.org/current/>
    PREFIX spatial: <http://jena.apache.org/spatial#>
    SELECT distinct ?id
    WHERE {
      GRAPH <http://data.stadnamn.uib.no/stedsnavn/bustadnamnregisteret>
      {  
        <:> 
        ?id a ecrm:E53_Place .  
        }
      }       
        `,
    'resultQuery':  `
    PREFIX farkplacename: <https://ontology.fylkesarkivet.no/placename#>
    PREFIX text: <http://jena.apache.org/text#>
    PREFIX spatial: <http://jena.apache.org/spatial#>
  
    PREFIX farkplacename: <https://ontology.fylkesarkivet.no/placename#>
    PREFIX text: <http://jena.apache.org/text#>
    PREFIX spatial: <http://jena.apache.org/spatial#>
    SELECT distinct ?id  ?broaderTypeLabel ?prefLabel ?broaderAreaLabel ?source ?markerColor ?type_uri ?lat ?long 
      WHERE {   GRAPH <http://data.stadnamn.uib.no/stedsnavn/sogn-og-fjordane> {
            {       SELECT distinct ?id WHERE { 
         <QUERY>
         } }
         ?id farkplacename:Naturkode ?broaderTypeLabel; 
         farkplacename:Normform ?prefLabel ;
         farkplacename:Fylke ?fylke_label ;
         farkplacename:Kommune ?kommune_label ;
         farkplacename:Wgs84Epsg4326Latitude ?lat ;
         farkplacename:Wgs84Epsg4326Longitude ?long . 
   
         BIND (CONCAT(?kommune_label, ", ",?fylke_label) AS ?broaderAreaLabel).
         BIND ("SOF" AS ?source).
         BIND ("blue" AS ?markerColor ).
     }}
      
      `
    
    },
  'pnr': {
    'title': 'Finnish Geographic Names Registry (contemporary)',
    'shortTitle': 'FGN',
    'timePeriod': 'contemporary',
    'endpoint': 'http://ldf.fi/pnr-keyword-index/sparql',
    'simpleSuggestionQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX sf: <http://ldf.fi/functions#>
      SELECT DISTINCT ?label
      WHERE {
        ?id text:query (skos:prefLabel '<QUERYTERM>*' 50) .
        ?id sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?lbl) .
        FILTER(STRSTARTS(LCASE(?lbl), '<QUERYTERM>'))
        BIND(STR(?lbl) AS ?label)
      }
        `,
    'resultQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX spatial: <http://jena.apache.org/spatial#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX sf: <http://ldf.fi/functions#>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
      SELECT ?id ?prefLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?markerColor ?manifest
      WHERE {
        <QUERY>
        ?id sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?prefLabel) .
        ?id a ?type .
        ?type sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?broaderTypeLabel) .
        ?id wgs84:lat ?lat .
        ?id wgs84:long ?long .
        OPTIONAL {
          ?id crm:P89_falls_within ?municipality .
          ?municipality a ?munType .
          ?municipality sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?broaderAreaLabel_) .
          FILTER (?munType != <http://ldf.fi/pnr-schema#SubRegion>)
        }      
        BIND(COALESCE(?broaderAreaLabel_, ?missingValue) as ?broaderAreaLabel)
        BIND("PNR" AS ?source)
        BIND("yellow" AS ?markerColor)
        BIND("-" AS ?missingValue)
      }
      `,
  },
  'tgn': {
    // Getty LOD documentation:
    // http://vocab.getty.edu/queries#Places_by_Type
    // https://groups.google.com/forum/#!topic/gettyvocablod/r4wsSJyne84
    // https://confluence.ontotext.com/display/OWLIMv54/OWLIM-SE+Full-text+Search
    // http://vocab.getty.edu/queries#Combination_Full-Text_and_Exact_String_Match
    // http://vocab.getty.edu/doc/#TGN_Place_Types
    'title': 'The Getty Thesaurus of Geographic Names',
    'shortTitle': 'TGN',
    'timePeriod': '',
    'endpoint': 'http://vocab.getty.edu/sparql.json',
    //'simpleSuggestionQuery':
    //  'SELECT+DISTINCT+?label+' +
    //  'WHERE+{' +
    //  '?id+a+skos:Concept;+' +
    //  'luc:term+"<QUERYTERM>*";+' +
    //  'skos:inScheme+tgn:;' +
    //  'gvp:prefLabelGVP/xl:literalForm+?lbl+.' +
    //  '+BIND(STR(?lbl)+AS+?label)' +
    //  'FILTER+(STRSTARTS(LCASE(?lbl),+"<QUERYTERM>"))' +
    //  '}' +
    //  'LIMIT+20',
    'resultQuery': `
      SELECT ?id (COALESCE(?labelEn,?labelGVP) AS ?prefLabel) ?broaderTypeLabel
        ?broaderAreaLabel ?source ?lat ?long ?markerColor
      WHERE {
          ?id luc:term "<QUERYTERM>" ;
          skos:inScheme tgn: ;
          gvp:placeTypePreferred [
            gvp:prefLabelGVP [
              xl:literalForm ?broaderTypeLabel;
              dct:language gvp_lang:en
            ]
          ];
          gvp:broaderPreferred/xl:prefLabel/xl:literalForm ?broaderAreaLabel .
        OPTIONAL {
          ?id xl:prefLabel [
            xl:literalForm ?labelEn ;
            dct:language gvp_lang:en
          ]
        }
        OPTIONAL {
          ?id gvp:prefLabelGVP [xl:literalForm ?labelGVP]
        }
        OPTIONAL {
          ?id foaf:focus ?place .
          ?place wgs:lat ?lat ;
                 wgs:long ?long .
        }
        FILTER EXISTS {
          ?id xl:prefLabel/gvp:term+?term .
          FILTER (LCASE(STR(?term))="<QUERYTERM>")
        }
        BIND("TGN" AS ?source)
        BIND("orange" AS ?markerColor)
      }
      `,
  },
  'kotus': {
    'title': 'Institute for the Languages of Finland (Kotus) Digital Names archive',
    'shortTitle': 'DNA',
    'timePeriod': '',
    'endpoint': 'http://ldf.fi/kotus-names-archive/sparql',
    // 'endpoint': 'http://localhost:3037/ds/sparql',
    // 'suggestionQuery': `
    //   PREFIX text: <http://jena.apache.org/text#>
    //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //   PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    //   PREFIX gs: <http://www.opengis.net/ont/geosparql#>
    //   PREFIX hipla: <http://ldf.fi/schema/hipla/>
    //   SELECT DISTINCT ?label (COUNT(?id) AS ?count)
    //   WHERE {
    //     (?id ?idcore) text:query (skos:prefLabel '<QUERYTERM>*') .
    //     ?id hipla:type [] .
    //     ?id skos:prefLabel ?lbl .
    //     BIND(STR(?lbl) AS ?label)
    //   }
    //   ORDER BY DESC(MAX(?idcore)) ?label
    //   LIMIT 20
    //   `,
    'simpleSuggestionQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX hipla: <http://ldf.fi/schema/hipla/>
      SELECT DISTINCT ?label
      WHERE {
        ?id text:query (skos:prefLabel '<QUERYTERM>*' 50) .
        ?id hipla:type [] .
        ?id skos:prefLabel ?lbl .
        FILTER(STRSTARTS(LCASE(?lbl), '<QUERYTERM>'))
        BIND(STR(?lbl) AS ?label)
      }
      `,
    'resultQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX spatial: <http://jena.apache.org/spatial#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX hipla-schema: <http://ldf.fi/schema/hipla/>
      PREFIX na-schema: <http://ldf.fi/schema/kotus-names-archive/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      SELECT ?id ?prefLabel ?namesArchiveLink ?typeLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?modifier ?basicElement ?collector ?collectionYear ?markerColor
      WHERE {
        <QUERY>
        ?id skos:prefLabel ?prefLabel .
        ?id na-schema:parish ?broaderAreaLabel .
        ?id owl:sameAs ?namesArchiveLink .
        BIND("NA" AS ?source)
        BIND("violet" AS ?markerColor)
        BIND("-" AS ?missingValue)
        OPTIONAL {
          ?id a ?type .
          OPTIONAL {
            ?type skos:prefLabel ?typeLabel_ .
            ?type rdfs:subClassOf/skos:prefLabel ?broaderTypeLabel_ .
          }
        }
        BIND(COALESCE(?typeLabel_, ?missingValue) as ?typeLabel)
        BIND(COALESCE(?broaderTypeLabel_, ?missingValue) as ?broaderTypeLabel)
        OPTIONAL {
          ?id wgs84:lat ?lat .
          ?id wgs84:long ?long .
        }
        OPTIONAL {
          ?id na-schema:place_name_modifier ?modifier ;
             na-schema:place_name_basic_element ?basicElement .
        }
        OPTIONAL { ?id na-schema:collector ?collector }
        OPTIONAL { ?id na-schema:stamp_date ?collectionYear }
      }
    `,
  },
};
