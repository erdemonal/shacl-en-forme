# SHACL en Forme <a href="https://www.w3.org/TR/shacl/"><img src="docs/images/shacl.svg" align="right" width="120" height="120" alt="SHACL"></a>

**SHACL Usage in the Wild**

SHACL en Forme presents statistics on the use of the Shapes Constraint Language (SHACL) in public GitHub repositories.

## Dataset and Methodology

Public GitHub repositories were identified through code search and repository search. Repositories were verified based on SHACL shape declarations, Core target or constraint predicates, or structurally attached SHACL-SPARQL constraints in parsed RDF graphs. After excluding forks and Git trees without extracted SHACL shape documents, the final dataset contains 3,675 repositories representing 3,657 distinct Git trees.

RDF files were retrieved from the recorded repository revisions and parsed using RDFLib. The analysis successfully parsed 548,135 of the 550,508 files identified for RDF processing. It identified 50,625 SHACL shape documents representing 33,230 distinct document contents. A file is counted as a SHACL shape document if it contains at least one SHACL shape. Files containing only annotations or validation reports are not counted.

The resource reports statistics on SHACL shapes, targets, property paths, Core constraint parameters, and SHACL-SPARQL. Additional analyses cover ontology references, public RDF vocabulary usage, OWL–SHACL constraint comparisons, constraint consistency, and usage contexts.

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
| `sh:closed` | 58,521 | 764 | 20.89% |
| `sh:maxExclusive` | 1,570 | 170 | 4.65% |
