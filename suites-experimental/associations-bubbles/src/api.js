// In-browser stand-in for the Open Targets GraphQL API and the EFO ontology
// file. It is a port of platform-app-react/mock-server/server.js and returns
// the same shapes the original queries (TargetFacets.gql, AssociationsViz.gql)
// would, so the components above it behave as they do against the server.
//
// Responses are delayed by ?latency=<ms> (default 0), always asynchronously,
// so loading states render as they do with a real network.
import target from './data/ENSG00000282608.json';
import ontologyText from './data/diseases_efo.jsonl?raw';

const latency = Number(new URLSearchParams(window.location.search).get('latency')) || 0;

const respond = value =>
  new Promise(resolve => setTimeout(() => resolve(value), latency));

const idToDisease = {};
ontologyText
  .trim()
  .split('\n')
  .forEach(line => {
    const node = JSON.parse(line);
    idToDisease[node.id] = node;
  });

// Names of the therapeutic areas (ontology roots) a disease belongs to
const taCache = {};
function therapeuticAreas(id) {
  if (!taCache[id]) {
    const node = idToDisease[id];
    taCache[id] = node.parentIds.length
      ? [...new Set(node.parentIds.flatMap(therapeuticAreas))]
      : [node.name];
  }
  return taCache[id];
}

const DATASOURCE_TO_DATATYPE = {
  chembl: 'known_drug',
  europepmc: 'literature',
  expression_atlas: 'rna_expression',
  eva: 'genetic_association',
  gwas_credible_sets: 'genetic_association',
  ot_genetics_portal: 'genetic_association',
  crispr_screen: 'affected_pathway',
  crispr: 'affected_pathway',
  impc: 'animal_model',
  phenodigm: 'animal_model',
};

// Facet paths each association matches, keyed by aggregation name
function facetPaths(assoc) {
  const dataTypes = assoc.datatypeScores.map(dt => [dt.id]);
  assoc.datasourceScores.forEach(ds => {
    const dt = DATASOURCE_TO_DATATYPE[ds.id];
    if (dt) dataTypes.push([dt, ds.id]);
  });
  return {
    dataTypes,
    therapeuticAreas: therapeuticAreas(assoc.disease.id).map(ta => [ta]),
  };
}

const associations = target.associations.map(assoc => ({
  ...assoc,
  facets: facetPaths(assoc),
}));

const startsWith = (path, prefix) => prefix.every((p, i) => path[i] === p);

// Filters with the same name are OR'd together, different names are AND'd
function applyAggregationFilters(assocs, filters) {
  const byName = {};
  filters.forEach(({ name, path }) => {
    (byName[name] = byName[name] || []).push(path);
  });
  return assocs.filter(assoc =>
    Object.entries(byName).every(([name, prefixes]) =>
      (assoc.facets[name] || []).some(path =>
        prefixes.some(prefix => startsWith(path, prefix))
      )
    )
  );
}

function aggregate(assocs) {
  const tree = {};
  assocs.forEach(assoc => {
    Object.entries(assoc.facets).forEach(([name, paths]) => {
      const counted = new Set();
      paths.forEach(path => {
        let level = (tree[name] = tree[name] || {});
        path.forEach((key, depth) => {
          level[key] = level[key] || { uniques: 0, children: {} };
          const id = path.slice(0, depth + 1).join('/');
          if (!counted.has(id)) {
            counted.add(id);
            level[key].uniques++;
          }
          level = level[key].children;
        });
      });
    });
  });

  const toRows = level =>
    Object.entries(level).map(([key, { uniques, children }]) => ({
      key,
      uniques,
      aggs: toRows(children),
    }));

  return {
    uniques: assocs.length,
    aggs: Object.entries(tree).map(([name, level]) => ({
      name,
      uniques: assocs.filter(a => a.facets[name].length).length,
      rows: toRows(level),
    })),
  };
}

export const ensemblId = target.id;
export const symbol = target.approvedSymbol;

// TargetFacetsQuery
export function fetchFacets(aggregationFilters = []) {
  const rows = applyAggregationFilters(associations, aggregationFilters);
  return respond({
    target: {
      id: target.id,
      approvedName: target.approvedName,
      associatedDiseases: { count: rows.length, aggregations: aggregate(rows) },
    },
  });
}

// AssociationsVizQuery
export function fetchAssociations(index, size, aggregationFilters = []) {
  const rows = applyAggregationFilters(associations, aggregationFilters);
  return respond({
    target: {
      id: target.id,
      associatedDiseases: {
        count: rows.length,
        rows: rows.slice(index * size, (index + 1) * size).map(row => ({
          disease: row.disease,
          score: row.score,
          datatypeScores: row.datatypeScores.map(({ id, score }) => ({
            componentId: id,
            score,
          })),
        })),
      },
    },
  });
}

// config.efoURL
export function fetchEfo() {
  return respond(ontologyText);
}
