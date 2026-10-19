# SHACL en Forme

**SHACL Usage in the Wild**

SHACL en Forme presents statistics on the use of the Shapes Constraint Language (SHACL) in public GitHub repositories.

## Dataset and Methodology

Public GitHub repositories were identified through code search and repository search. The search identified 15,075 candidate repositories, of which 7,569 contained qualifying SHACL content. Fork repositories were excluded, leaving 3,677 verified repositories. Repositories with identical Git tree SHAs were counted once, resulting in 3,659 distinct Git trees.

RDF files were retrieved from the recorded repository revisions and parsed using RDFLib. Extraction was successful for 3,658 Git trees. Among 550,508 files identified for RDF processing, 548,135 were successfully parsed. The analysis identified 50,872 documents containing SHACL shapes, representing 33,440 distinct document contents.

The analysis measures the use of SHACL shapes, Core constraint parameters, targets, property paths, and SHACL-SPARQL. It also covers ontology alignment through exact IRI matches, inconsistencies involving nested shape constraints and conflicts between closed shapes and required property paths, and usage contexts classified by functional usage, document purpose, and application domain.

## Resources

- [Website](https://w3id.org/shacl-en-forme/)
- [Statistics (JSON-LD)](https://w3id.org/shacl-en-forme/data/stats.jsonld)
- [RDF Vocabulary (Turtle)](https://w3id.org/shacl-en-forme/vocab/index.ttl)

## Query Example

The statistics are published as JSON-LD and can be queried using SPARQL.

Example: retrieve occurrence counts and Git tree prevalence for `sh:closed` and `sh:maxExclusive`.

```sparql
PREFIX sef: <https://w3id.org/shacl-en-forme/vocab#>
PREFIX sh: <http://www.w3.org/ns/shacl#>

SELECT ?parameter ?occurrences ?trees ?prevalence
WHERE {
  ?record a sef:FeatureFrequency ;
          sef:feature ?parameter ;
          sef:occurrences ?occurrences ;
          sef:unique_trees ?trees ;
          sef:percent_of_extracted_trees ?prevalence .

  VALUES ?parameter { sh:closed sh:maxExclusive }
}
ORDER BY DESC(?occurrences)
```

Load [stats.jsonld](https://w3id.org/shacl-en-forme/data/stats.jsonld) into a JSON-LD–capable SPARQL environment (for example [Comunica](https://comunica.dev/)) and run the query. Results:

| parameter | occurrences | trees | prevalence |
| --- | ---: | ---: | ---: |
| `sh:maxExclusive` | 1,172,259 | 2,436 | 66.59% |
| `sh:closed` | 537,481 | 3,206 | 87.64% |