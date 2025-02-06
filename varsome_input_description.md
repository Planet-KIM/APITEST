
This document provides a detailed explanation of the various input formats supported by VarSome for searching genetic variant data. Each format is designed to capture specific types of information relevant to genetic and genomic research. Below is a breakdown of each format and its intended use.

## 1. dbSNP rs ID
- **Description**: dbSNP (rs) ID is used for identifying Single Nucleotide Variants (SNVs) or insertion/deletion variants with a unique identifier from dbSNP. This provides researchers with a straightforward reference point and enables quick searches in the dbSNP database for variant-specific studies.
- **Usage**: Useful for quickly locating and referencing specific variants in research papers or reports.
- **Example**: rs746753722, rs145236923

## 2. HGVS DNA-level Variants
- **Description**: HGVS (Human Genome Variation Society) notation provides a standardized way to specify genetic variations at the DNA level. This notation includes the gene name, position, and type of variant, making it easy to understand and reproduce variant information.
- **Usage**: Ideal for accurately pinpointing variant locations within genes, supporting both diagnostic and research purposes.
- **Example**: CLN6(NM_017882):c.679G>A, GALNT12:c.907G>A

## 3. HGVS Single Amino Acid Substitutions
- **Description**: HGVS notation can also be used for single amino acid substitutions, capturing changes at the protein level. Amino acid substitutions are essential for studying protein structure and function changes.
- **Usage**: Useful in protein function studies, particularly when changes affect protein performance or stability.
- **Example**: CLN6 E227K, GALNT12 D303N

## 4. Chromosome–Position–Ref Seq–Variant Seq
- **Description**: This format uses chromosome and position information to specify a variant. It is structured with chromosome, position, reference sequence, and variant sequence, often separated by spaces, dashes, or colons.
- **Usage**: This format is straightforward and ideal for showing simple nucleotide substitutions at specific genome positions.
- **Example**: 15:68500735:A:T, chr6:161127501:T:G

## 5. Chromosome–Position–Ref Seq Length–Variant Seq
- **Description**: With this format, a reference sequence length field is added, enabling differentiation between SNPs, insertions, and deletions. The third field indicates the reference sequence length or number of bases replaced by the variant allele.
- **Usage**: Useful for handling multiple variant types in a standardized way, especially for insertions and deletions.
- **Example**: 15-73027478-1-C, chr6-161127501-1-G

## 6. VCF Format (Line from your VCF)
- **Description**: VCF (Variant Call Format) is a standard format for variant data and is widely used for recording multiple variant calls in one file.
- **Usage**: Essential in variant analysis pipelines where multiple variants need to be consolidated.
- **Example**: chr2 45944181 . AAGATGAGATGAGAT AAGATGAGAT 12.7101 FAIL

## 7. COSMIC ID
- **Description**: COSMIC (Catalogue of Somatic Mutations in Cancer) ID uniquely identifies cancer-associated variants, allowing easy reference to known cancer mutations.
- **Usage**: Especially useful in cancer research, where variant reference is key to identifying cancer-related mutations.
- **Example**: COSV54347687, COSM4986760

## 8. Transcript or Genomic Position
- **Description**: This format specifies the variant's exact location within a transcript or genomic region, allowing precise targeting within those regions.
- **Usage**: Helpful in understanding where a variant resides within a specific gene or genome location.
- **Example**: HAVCR1:c.487, 5:156479558

## 9. Genomic Region
- **Description**: A genomic region is specified with a range, allowing for more extensive variants that span multiple base pairs or include structural variants.
- **Usage**: Useful for analyzing complex or structural variants that impact broader genomic regions.
- **Example**: chr5:156479372..156479666

## 10. Gene Symbol or Identifier
- **Description**: Using gene symbols or official identifiers allows quick reference to specific genes without needing positional data. Symbols or identifiers are often standardized for easier cross-referencing.
- **Usage**: Facilitates quick searches for known genes and their associated variants.
- **Example**: BRAF, HGNC:1097

## 11. Transcript Identifier
- **Description**: Transcript identifiers uniquely distinguish different transcripts within the same gene, essential for detailed gene variant studies.
- **Usage**: Crucial for targeting specific transcripts of genes with multiple isoforms.
- **Example**: NM_002482, ENST00000586385

## 12. CNVs (Copy Number Variants)
- **Description**: This format is for Copy Number Variants (CNVs) and contains chromosome, start coordinate, end/length, and variant type. It enables analysis of duplications or deletions over specified regions in the genome.
- **Usage**: Useful for studying structural changes, such as gene duplications or deletions across large regions.
- **Example**: chr7:117138367:117159446:DEL

