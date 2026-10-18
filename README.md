# SHACL en Forme
<img src="docs/images/shacl.svg" align="right" width="120" height="120" alt="SHACL">

**SHACL Usage in the Wild**

SHACL en Forme presents statistics on the use of the Shapes Constraint Language (SHACL) in public GitHub repositories. It follows the structure and terminology of SHACL 1.0 and adds usage statistics to the relevant sections.

## Dataset and Methodology

Public GitHub repositories were identified through code search and repository search. The search identified 15,075 candidate repositories, of which 7,569 contained qualifying SHACL content. Fork repositories were excluded, leaving 3,677 verified repositories. Repositories with identical Git tree SHAs were counted once, resulting in 3,659 distinct Git trees.

RDF files were retrieved from the recorded repository revisions and parsed using RDFLib. Extraction was successful for 3,658 Git trees. Among 550,508 files identified for RDF processing, 548,135 were successfully parsed. The analysis identified 50,872 documents containing SHACL shapes, representing 33,440 distinct document contents.

The analysis measures SHACL shapes, Core constraint parameters, targets, property paths, and SHACL-SPARQL usage. It also examines ontology alignment through exact IRI matches, selected constraint inconsistencies, and usage contexts classified by functional usage, document purpose, and application domain.

## Resources

- [Website](https://w3id.org/shacl-en-forme/)
- [Statistics (JSON-LD)](https://w3id.org/shacl-en-forme/data/stats.jsonld)
- [RDF Vocabulary (Turtle)](https://w3id.org/shacl-en-forme/vocab/index.ttl)
