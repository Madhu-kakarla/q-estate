import React, { useEffect, useState } from 'react'
import styles from './Explore.module.css'
import Header from '../Header/Header'
import axios from 'axios';
import config from '../../config';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import SortingFilter from '../SortingFilter/SortingFilter';
import ListingsTableView from '../ListingsTableView/ListingsTableView';
import Footer from '../Footer/Footer';

const Explore = () => {

  const [listingsData, setListingsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  async function fetchListings() {
    try{
      const response = await axios.get(`${config.backendEndpoint}/real-estate-data`);
      setListingsData(response.data.listings);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchListings()
  },[])

  // Filter Handlers
  const handleLocationFilterChange = (ev) => {
    const isChecked = ev.target.checked;
    if(isChecked){
      setLocationFilter((prevState) => [...prevState, ev.target.value]);
    } else {
      setLocationFilter((prevState) => prevState.filter(ele => ele !== ev.target.value))
    }
  }

  const handlePriceRangeFilterChange = (ev) => {
    if(ev.target.checked) 
      setPriceRangeFilter((prevState) => [...prevState, ev.target.value])
    else
      setPriceRangeFilter((prevState) => prevState.filter(ele => ele !== ev.target.value))
  }

  const handleSortByChange = (ev) => {
    setSortBy(ev.target.value)
  }

  return (
    <>
      <Header onPage='explore' />
      <div className={styles.propertyListingsView}>
        <CheckboxFilter 
          locationFilter={locationFilter}
          priceRangeFilter={priceRangeFilter}
          handleLocationFilterChange={handleLocationFilterChange} 
          handlePriceRangeFilterChange={handlePriceRangeFilterChange}

        />
        <SortingFilter 
          sortBy={sortBy} 
          handleSortByChange={handleSortByChange}
        />
        <ListingsTableView 
          listingsData={listingsData}
          locationFilter={locationFilter}
          priceRangeFilter={priceRangeFilter}
          sortBy={sortBy}
        />
      </div>
      <Footer />
    </>
  )
}

export default Explore