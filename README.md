# SHACL en Forme <a href="https://www.w3.org/TR/shacl/"><img src="docs/images/shacl.svg" align="right" width="120" height="120" alt="SHACL"></a>

[![100.00 % FAIR](https://img.shields.io/badge/FAIR_assessment-100.00_%25-green)](https://w3id.org/fairchecker/assessment/6afdf0f106b01a7def4eed72)

**SHACL Usage in the Wild**

SHACL en Forme presents statistics on how the Shapes Constraint Language (SHACL) is used in public GitHub repositories.

## Dataset and Methodology

Public GitHub repositories were identified through code search and repository search. Repository verification used parsed Resource Description Framework (RDF) graphs. A repository qualified if a graph contained a SHACL shape declaration, a Core target or constraint predicate, or a constraint written in the SPARQL Protocol and RDF Query Language (SPARQL) and attached to a shape through `sh:sparql`. After excluding forks and Git trees without extracted SHACL shape documents, the final dataset contains 3,675 repositories representing 3,657 distinct Git trees.

RDF files were retrieved from the recorded repository revisions and parsed using RDFLib. The analysis successfully parsed 548,135 of the 550,508 files identified for RDF processing. It identified 50,625 SHACL shape documents representing 33,230 distinct document contents. A file is counted as a SHACL shape document if it contains at least one SHACL shape. Files containing only annotations or validation reports are not counted.

The resource covers SHACL shapes, targets, property paths, Core constraint parameters, and SHACL-SPARQL. Additional analyses examine ontology term declarations, OWL–SHACL constraint comparisons, and constraint satisfiability.

## Resources

- [Website](https://w3id.org/shacl-en-forme/)
- [Statistics (JSON-LD)](https://w3id.org/shacl-en-forme/data/stats.jsonld)
- [RDF Vocabulary (Turtle)](https://w3id.org/shacl-en-forme/vocab/index.ttl)

## Query Example

The statistics are available as JSON-LD and can be queried using SPARQL. Example queries are provided in [`queries/`](queries/). Run them with:

```bash
npm install
npm run query
```

For example, the following results are retrieved from the dataset:

| parameter | occurrences | trees | prevalence |
| --- | ---: | ---: | ---: |
| `sh:closed` | 58,521 | 764 | 20.89% |
| `sh:maxExclusive` | 1,570 | 170 | 4.65% |
