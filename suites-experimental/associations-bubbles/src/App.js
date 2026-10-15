// The /target/:ensgId/associations/bubbles route of platform-app-react
// (ClassicAssociations.js) without the router, Apollo or the rest of the
// target page around it.
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import { Facets } from './components/Facets';
import Wrapper from './Wrapper';
import theme from './theme';
import { ensemblId, symbol, fetchFacets } from './api';

// Mimics Apollo's useQuery: data is undefined while a new request is loading
function useFacetsQuery(aggregationFilters) {
  const [result, setResult] = useState({ loading: true, data: undefined });
  useEffect(
    () => {
      let isCurrent = true;
      setResult({ loading: true, data: undefined });
      fetchFacets(aggregationFilters).then(data => {
        if (isCurrent) setResult({ loading: false, data });
      });
      return () => (isCurrent = false);
    },
    [aggregationFilters]
  );
  return result;
}

function ClassicAssociations({ ensgId, symbol }) {
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const { loading, data } = useFacetsQuery(aggregationFilters);

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
  };

  const facetData = data?.target?.associatedDiseases.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>
                {data.target.associatedDiseases.count} diseases or phenotypes
              </strong>{' '}
              associated with <strong>{symbol}</strong>
            </>
          ) : (
            <strong>Loading...</strong>
          )}
        </Typography>
      </Grid>{' '}
      <Grid item xs={12} lg={3}>
        <Card elevation={0}>
          <CardContent>
            <Facets
              loading={loading}
              data={facetData}
              onChange={handleChangeFilters}
              type="disease"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Tabs value="bubbles">
          <Tab value="table" label="Table" disabled />
          <Tab value="bubbles" label="Bubbles" />
          <Tab value="graph" label="Graph" disabled />
        </Tabs>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            <Wrapper
              ensemblId={ensgId}
              symbol={symbol}
              Component={ClassicAssociationsBubbles}
              aggregationFilters={aggregationFilters}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <Container maxWidth={false}>
        <ClassicAssociations ensgId={ensemblId} symbol={symbol} />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
