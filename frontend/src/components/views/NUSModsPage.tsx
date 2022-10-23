import React, { FormEvent, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChevronLeftRounded as Back,
  ChevronRightRounded as Next,
} from '@mui/icons-material';
import { NUSModsLogo } from '../../icons/NUSMods';
import Module from '../../Module';
import { APIReq } from '../../utils/api-request';
import ModuleCard from '../ModuleCard';

const PageIndicator = (props: {
  currPage: number;
  maxPage: number;
  setPage: (_: number) => void;
}) => {
  const { currPage, maxPage, setPage } = props;
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={2}
    >
      {currPage > 1 && (
        <IconButton onClick={() => setPage(currPage - 1)}>
          <Back />
        </IconButton>
      )}
      <Typography variant='h6'>{currPage}</Typography>
      {currPage < maxPage && (
        <IconButton onClick={() => setPage(currPage + 1)}>
          <Next />
        </IconButton>
      )}
    </Stack>
  );
};

interface FilterParams {
  faculty?: string;
  department?: string;
}

function NUSModsPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [modules, setModules] = useState<Module[]>([]);
  const [faculties, setFaculties] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    const getModules = async () =>
      await APIReq.getModules().then(
        ({ data: { faculties, departments, pages, modules } }) => {
          setFaculties(faculties);
          setDepartments(departments);
          setMaxPage(pages);
          setModules(modules);
        }
      );
    getModules().catch(console.error);
  }, []);

  const fetchFilteredModules = (params: FilterParams) => {
    console.log(params);
    APIReq.getModules(page, params).then(({ data: { modules } }) =>
      setModules(modules)
    );
  };

  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const faculty = data.get('faculty')?.toString();
    const department = data.get('department')?.toString();
    const updatedFilter = { faculty, department };

    setFilters(updatedFilter);
    setPage(1);
    console.log(filters);
  };

  useEffect(() => fetchFilteredModules(filters), [filters, page]);

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
          onSubmit={handleFilter}
          style={{
            width: '300px',
            padding: '1rem',
            position: 'fixed',
          }}
        >
          <Stack spacing={2}>
            <Typography variant='h5'>Filters</Typography>
            <Autocomplete
              options={faculties}
              renderInput={(faculty) => (
                <TextField {...faculty} label='Faculty' name='faculty' />
              )}
            />
            <Autocomplete
              options={departments}
              renderInput={(department) => (
                <TextField
                  {...department}
                  label='Department'
                  name='department'
                />
              )}
            />
            <Button type='submit'>Search and Filter</Button>
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
