import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { NUSModsLogo } from '../icons/NUSMods';
import Module from '../../models/Module';
import { APIReq } from '../../utils/api-request';
import ModuleCard from '../ModuleCard';
import { PageIndicator } from '../PageIndicator';

interface FilterParams {
  faculty?: string;
  department?: string;
  page?: number;
}

function NUSModsPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [modules, setModules] = useState<Module[]>([]);
  const [faculties, setFaculties] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    APIReq.getModules()
      .then(({ data: { faculties, departments, pages, modules } }) => {
        setFaculties(faculties);
        setDepartments(departments);
        setMaxPage(pages);
        setModules(modules);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchFilteredModules = (params: FilterParams) =>
      APIReq.getModules(params).then(
        ({ data: { faculties, departments, modules } }) => {
          setModules(modules);
          setDepartments(departments);
          setFaculties(faculties);
        }
      );
    fetchFilteredModules(filters);
  }, [filters]);

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'primary',
        background: 'black',
      }}
    >
      <Stack
        direction='row'
        width='100%'
        spacing={2}
        alignItems='center'
        height='60px'
        padding='1rem'
        position='fixed'
        style={{ background: 'inherit' }}
      >
        <NUSModsLogo />
      </Stack>
      <Stack direction='row' style={{ marginTop: '60px' }}>
        <form
          style={{
            width: '300px',
            padding: '1rem',
            position: 'fixed',
          }}
        >
          <Stack spacing={2}>
            <Typography variant='h5'>Filters</Typography>
            <Autocomplete
              multiple
              filterSelectedOptions
              onChange={(_, v) =>
                setFilters({ ...filters, faculty: v.join(',') })
              }
              options={faculties}
              renderInput={(faculty) => (
                <TextField
                  {...faculty}
                  label='Faculty'
                  name='faculty'
                  SelectProps={{ multiple: true, defaultValue: [] }}
                />
              )}
            />
            <Autocomplete
              multiple
              filterSelectedOptions
              onChange={(_, v) =>
                setFilters({ ...filters, department: v.join(',') })
              }
              options={departments}
              renderInput={(department) => (
                <TextField
                  {...department}
                  label='Department'
                  name='department'
                />
              )}
            />
          </Stack>
        </form>
        <Box maxWidth='600px' height='100%' style={{ marginLeft: '300px' }}>
          {modules.map((module, i) => (
            <ModuleCard module={module} key={i} />
          ))}
          <PageIndicator currPage={page} maxPage={maxPage} setPage={setPage} />
        </Box>
      </Stack>
    </Box>
  );
}

export default NUSModsPage;
