import React, { useState, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { downloaderChunkSize } from './constants';
import { fetchAssociations, fetchEfo } from './api';

// Same chunked download as hooks/useBatchDownloader.js
async function getAllAssociations(aggregationFilters) {
  const getRows = chunk => chunk.target.associatedDiseases.rows;
  const firstChunk = await fetchAssociations(
    0,
    downloaderChunkSize,
    aggregationFilters
  );
  let data = [...getRows(firstChunk)];
  const count = Math.ceil(
    firstChunk.target.associatedDiseases.count / downloaderChunkSize
  );
  const chunkPromises = [];
  for (let index = 1; index < count; index++) {
    chunkPromises.push(
      fetchAssociations(index, downloaderChunkSize, aggregationFilters)
    );
  }
  const remainingChunks = await Promise.all(chunkPromises);
  remainingChunks.forEach(chunk => {
    data = [...data, ...getRows(chunk)];
  });
  return data;
}

function Wrapper({ ensemblId, symbol, Component, aggregationFilters }) {
  const [nodes, setNodes] = useState();
  const [associations, setAssociations] = useState();

  useEffect(
    () => {
      let isCurrent = true;
      const promises = [fetchEfo(), getAllAssociations(aggregationFilters)];
      Promise.all(promises).then(data => {
        if (isCurrent) {
          const nodes = data[0]
            .trim()
            .split('\n')
            .map(JSON.parse);
          setNodes(nodes);
          setAssociations(data[1]);
        }
      });

      return () => (isCurrent = false);
    },
    [ensemblId, aggregationFilters]
  );

  if (!nodes || !associations) {
    return <Skeleton variant="rect" height="40vh" />;
  }

  const idToDisease = nodes.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  return (
    <Component
      ensemblId={ensemblId}
      symbol={symbol}
      idToDisease={idToDisease}
      associations={associations}
    />
  );
}

export default Wrapper;
