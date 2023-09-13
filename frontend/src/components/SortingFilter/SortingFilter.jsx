import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import styles from '../Explore/Explore.module.css'

const options = ['none', 'price', 'date']

const SortingFilter = ({sortBy, handleSortByChange}) => {
  return (
    <div className={styles.sortingFilterContainer}>
      <h2 className={styles.title}>Sort By:</h2>
      <Box sx={{ minWidth: 200 }}>
        <FormControl sx={{width:'200px'}} size='small'>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="sorting-label"
            id="demo-simple-select"
            value={sortBy}
            label="Sort By"
            onChange={handleSortByChange}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>{option && option[0].toUpperCase() + option.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default SortingFilter