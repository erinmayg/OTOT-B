import React, { useState, useEffect } from 'react';
import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { APIReq } from '../../utils/api-request';
import ModuleModel from '../../models/Module';

interface FilterParams {
  faculty?: string;
  department?: string;
  page?: number;
}

function FilterModule(props: {
  faculties: string[];
  departments: string[];
  setModules: (modules: ModuleModel[]) => void;
}) {
  const { setModules } = props;
  const [faculties, setFaculties] = useState<string[]>(props.faculties);
  const [departments, setDepartments] = useState<string[]>(props.departments);
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    const fetchFilteredModules = (params: FilterParams) =>
      APIReq.getModules(params).then(
        ({ data: { faculties, departments, modules } }) => {
          setModules(modules);
          setDepartments(departments);
          setFaculties(faculties);
        }
      );
    setModules([]);
    fetchFilteredModules(filters);
  }, [filters]);

  return (
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
          onChange={(_, v) => setFilters({ ...filters, faculty: v.join(',') })}
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
            <TextField {...department} label='Department' name='department' />
          )}
        />
      </Stack>
    </form>
  );
}

export default FilterModule;
