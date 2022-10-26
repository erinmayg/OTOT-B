import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { NUSModsLogo } from '../icons/NUSMods';
import Module from '../../models/Module';
import { APIReq } from '../../utils/api-request';
import ModuleView from '../ModuleView';
import FilterModule from '../modal/FilterModule';

function NUSModsPage() {
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [modules, setModules] = useState<Module[]>([]);

  const [faculties, setFaculties] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

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

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'primary',
        background: 'background',
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
        <FilterModule
          setModules={setModules}
          faculties={faculties}
          departments={departments}
        />
        <ModuleView modules={modules} pageState={{page, setPage}} maxPage={maxPage} />
      </Stack>
    </Box>
  );
}

export default NUSModsPage;
